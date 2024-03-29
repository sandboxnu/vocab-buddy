import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import JSZip from "jszip";
import { randomNumberBetween, shuffle } from "../constants/utils";
import {
  AccountType,
  Assessment,
  AssessmentResult,
  FirebaseAssessmentResults,
  FirebaseInterventionResult,
  FirebaseInterventionResults,
  FirebaseWordIntervention,
  Interventions,
  InterventionWord,
  SessionId,
  SessionStats,
  User,
  UserSettings,
  Word,
  WordMapping,
  WordResult,
} from "../models/types";
import _ from "lodash";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  appId: process.env.REACT_APP_APP_ID,
};

var baseEmail = process.env.REACT_APP_BASE_EMAIL;

const userToEmail = (username: string) =>
  baseEmail!.replace("<username>", username.replace(" ", "."));

firebase.initializeApp(firebaseConfig);

export const allProfileIcons = [
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fufocircle.svg?alt=media&token=267fc738-9a95-4573-adcf-e1e1c8e6bd64",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fairplanecircle.svg?alt=media&token=821f4298-66ba-4efb-92a3-f2fb6477b866",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fbicyclecircle.svg?alt=media&token=9fba5a81-15f7-497d-93bc-4f7b274bc699",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fboatcircle.svg?alt=media&token=6c3582c3-13ce-4d05-99e7-716396d00b41",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fcarcircle.svg?alt=media&token=66eb0175-a4f7-4283-8544-b08b18c0132b",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fhotairballooncircle.svg?alt=media&token=af5929aa-5676-48c8-b6cc-6e2a8a89cdbb",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Frocketcircle.svg?alt=media&token=2378a891-001b-4a7f-9522-3dffee8d202d",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fscootercircle.svg?alt=media&token=01b70dc3-d59d-441b-aa35-47f3bc8a4aa7",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Ftraincircle.svg?alt=media&token=99b09351-0321-47d4-8a1c-45deb43f6d3b",
  "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Ftruckcircle.svg?alt=media&token=d0c0e891-7922-4e4a-a6e7-c601ff8fc213",
];

/**
 * A class to interact with firebase. This class stores the current state,
 * including a reference to the firestore, and the current authenticated user.
 * This adds a level of abstraction around firebase, so that this is the only object dealing with the server
 */
export default class FirebaseInteractor {
  /** {@type Firestore} */
  db = firebase.firestore();

  /** {@type Storage} */
  storage = firebase.storage();

  /** {@type Auth} */
  get auth() {
    return firebase.auth();
  }

  /** {@type User} */
  currentUser: User | null = null;

  unsubscribe: (() => void) | null = null;

  /** */
  waitToBeSignedIn() {
    return new Promise((resolve, reject) => {
      this.unsubscribe = this.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.createCurrentUser().then((_) => {
            resolve(true);
          });
        }
      });
    });
  }

  /**
   * Downloads Image at the given uri.
   * This returns a promise to a downloadable url
   * @param {String} uri the uri to the image
   * @returns {Promise<String>}
   */
  async downloadImage(uri: string): Promise<string> {
    return await this.storage.ref().child(uri).getDownloadURL();
  }

  /**
   * Creates an account for a user
   */
  async createAccount(
    password: string,
    name: string,
    accountType: AccountType,
    dob: Date | null
  ) {
    this.unsubscribe?.apply(this);
    const email = userToEmail(name);
    let userAuth = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (userAuth.user?.uid == null) {
      throw new Error("No actual user");
    }
    this.db.collection("users").doc(userAuth.user.uid).set({
      name,
      accountType,
      dob,
    });
    if (accountType === "STUDENT") {
      let initialAssessmentId = await this.createInitialAssessment();
      let currentDaysActive: string[] = [];
      this.db
        .collection("users")
        .doc(userAuth.user.uid)
        .update({
          daysActive: currentDaysActive,
          currentInterventionOrAssessment: initialAssessmentId,
          sessionId: -1,
          onAssessment: true,
          profileIcon:
            allProfileIcons[randomNumberBetween(0, allProfileIcons.length - 1)],
        });
    }
  }

  async signInWithUsernameAndPassword(username: string, password: string) {
    this.unsubscribe?.apply(this);
    const email = userToEmail(username);
    await this.auth.signInWithEmailAndPassword(email, password);
    await this.createCurrentUser();
  }

  async getUser(id: string | undefined): Promise<User> {
    let idToUse = id || this.auth.currentUser?.uid;
    let user = await this.db.collection("users").doc(idToUse).get();
    let userData = user.data();
    if (userData !== undefined) {
      return this.getUserFromData(idToUse || "", userData);
    } else {
      if (id === undefined) {
        // user exists in auth but has been deleted from database
        await this.auth.currentUser?.delete();
      }
      throw new Error("Invalid user");
    }
  }

  async createCurrentUser() {
    try {
      this.currentUser = await this.getUser(undefined);
    } catch (error) {
      // Hopefully this does not happen.
      console.log(error);
    }
  }

  async updateCurrentUser(user: Partial<User>) {
    await this.db
      .collection("users")
      .doc(this.auth.currentUser?.uid)
      .update(user);
  }

  async createInitialAssessment() {
    let words = await this.db.collection("words").get();
    let wordIds = words.docs.map((word) => word.id);
    let newAssessmentFields = {
      currentIndex: 0,
      durationsInSeconds: 0,
      words: wordIds,
      userId: this.auth.currentUser?.uid,
      session: -1,
      results: {},
    };
    let newAssessment = this.db.collection("assessments").doc();
    await newAssessment.set(newAssessmentFields);
    return newAssessment.id;
  }

  /**
   * update intervention idx number
   */
  async updateIntervention(
    interventions: Interventions,
    wordIdx: number,
    activityIdx: number,
    durationsInSeconds: number,
    activity2Correct?: boolean,
    activity2ImageSelected?: string,
    activity3Correct?: boolean,
    activity3Image?: string,
    activity3Part2Correct?: boolean,
    activity3Part2Image?: string,
    activity3Part3Correct?: boolean,
    activity3Part3Image?: string
  ) {
    let intervention = this.db
      .collection("interventions")
      .doc(interventions.setId);

    let newResult: FirebaseInterventionResult = {};

    let wordList: string[] = interventions.wordList.map((word) => word.word.id);
    if (activity2Correct !== undefined) {
      newResult = {
        activity2ImageSelected,
        activity2Correct,
      };
    }

    if (activity3Correct !== undefined) {
      newResult = {
        ...newResult,
        activity3Image,
        activity3Correct,
      };
    }

    if (activity3Part2Correct !== undefined) {
      newResult = {
        ...newResult,
        activity3Part2Image,
        activity3Part2Correct,
      };
    }

    if (activity3Part3Correct !== undefined) {
      newResult = {
        ...newResult,
        activity3Part3Image,
        activity3Part3Correct,
      };
    }

    const increment = firebase.firestore.FieldValue.increment(
      durationsInSeconds
    );

    let object: any = {
      wordIdx,
      activityIdx,
      durationsInSeconds: increment,
      results: { [wordList[wordIdx]]: newResult },
    };

    intervention.set(object, { merge: true });
    this.updateDaysActive();
  }

  async updateDaysActive() {
    let userId = this.auth.currentUser?.uid;

    let today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    await this.db
      .collection("users")
      .doc(userId)
      .update({
        daysActive: firebase.firestore.FieldValue.arrayUnion(today.toString()),
      });
  }

  /**
   * Creates a new assessment with all of the words from the given intervention.
   */
  async createAssessmentFromIntervention(setId: string) {
    let intervention = await this.db
      .collection("interventions")
      .doc(setId)
      .get();
    let interventionData = intervention.data();
    if (interventionData == null) {
      throw new Error(`Intervention with id ${setId} does not exist`);
    }

    let wordList = interventionData.wordList;
    let newAssessment = this.db.collection("assessments").doc();

    await this.createCurrentUser();
    let initialAssessmentFields = {
      currentIndex: 0,
      durationsInSeconds: 0,
      words: wordList,
      userId: this.auth.currentUser?.uid,
      session: this.currentUser?.sessionId,
      results: {},
    };
    await newAssessment.set(initialAssessmentFields);
    await this.updateCurrentUser({
      onAssessment: true,
      currentInterventionOrAssessment: newAssessment.id,
    });
  }

  /**
   * Gets all possible words.
   *
   * @returns { Promise<Assessment> }
   */
  async getAssessment(firebaseId: string): Promise<Assessment> {
    let assessmentRef = await this.db
      .collection("assessments")
      .doc(firebaseId)
      .get();

    let assessment = assessmentRef.data();
    if (assessment == null) {
      throw new Error(`Assessment with id ${firebaseId} does not exist`);
    }
    let { id, currentIndex, words } = assessment;

    let actualWords: Word[] = [];
    for (let wordString of words) {
      let wordRef = await this.db.collection("words").doc(wordString).get();
      let word = wordRef.data();
      if (word == null) {
        throw new Error(`There is no word with the id ${wordString}`);
      }
      actualWords.push({
        value: word.value,
        correctImage: word.correctImage,
        incorrectImages: word.incorrectImages,
        id: wordRef.id,
        createdAt: word.dateCreated.toDate(),
        assessmentPrompt: word.assessmentPrompt,
      });
    }
    actualWords.sort(
      (word1, word2) => word1.createdAt.getTime() - word2.createdAt.getTime()
    );
    return {
      id,
      currentIndex,
      words: actualWords,
      assessmentId: assessment.id,
      sessionId: assessment.session === undefined ? -1 : assessment.session,
    };
  }

  async updateAssessment(
    id: string,
    responses: AssessmentResult[],
    currentIdx: number,
    durationsInSeconds: number
  ) {
    const increment = firebase.firestore.FieldValue.increment(
      durationsInSeconds
    );

    await this.db
      .collection("assessments")
      .doc(id)
      .update({
        ...Object.fromEntries(
          responses.map((response) => [
            `results.${response.word}`,
            {
              correct: response.correct,
              imageSelected: response.imageSelected,
            },
          ])
        ),
        currentIndex: currentIdx,
        durationsInSeconds: increment,
      });

    this.updateDaysActive();
  }

  async createInterventionFromAssessment(
    sessionId: SessionId,
    id: string
  ): Promise<void> {
    let documents = await this.db
      .collection("interventions")
      .where("userId", "==", this.auth.currentUser?.uid)
      .get();
    if (documents.docs.length > 0) {
      await this.updateCurrentUser({
        sessionId: sessionId < 8 ? ((sessionId + 1) as SessionId) : sessionId,
        onAssessment: false,
        currentInterventionOrAssessment:
          documents.docs.filter(
            (doc) => doc.data().session === sessionId + 1
          )[0]?.id || "",
      });
      return;
    }
    let results = (await this.db.collection("assessments").doc(id).get()).data()
      ?.results as FirebaseAssessmentResults;
    let incorrectWords = Object.entries(results)
      .filter(([_id, result]) => !result.correct)
      .map(([id, _result]) => id);
    shuffle(incorrectWords);
    const interventionWords = _.chunk(incorrectWords, 3).slice(0, 8); // just in case we have more than 24 for some reason
    for (let session in interventionWords) {
      // Add 3 words per intervention (wrapping around for now)
      let wordList = interventionWords[session];
      let newIntervention = await this.db.collection("interventions").add({
        durationsInSeconds: 0,
        activityIdx: 0,
        wordIdx: 0,
        wordList,
        // Assign it to the current user
        userId: this.auth.currentUser?.uid,
        // Decide which session the intervention is in
        session: Number.parseInt(session, 10),
        results: {},
      });
      if (session === "0") {
        await this.updateCurrentUser({
          sessionId: 0,
          onAssessment: false,
          currentInterventionOrAssessment: newIntervention.id,
        });
      }
    }
  }

  async getWord(id: string): Promise<Word> {
    let word = (await this.db.collection("words").doc(id).get()).data();
    if (word == null) {
      throw Error("This word does not exist");
    }
    return {
      value: word.value,
      correctImage: word.correctImage,
      incorrectImages: word.incorrectImages,
      id: id,
      createdAt: word.dateCreated.toDate(),
      assessmentPrompt: word.assessmentPrompt,
    };
  }

  async getIntervention(id: string): Promise<Interventions> {
    let interventionRef = await this.db
      .collection("interventions")
      .doc(id)
      .get();
    let intervention = interventionRef.data();
    if (intervention == null) {
      throw new Error("There is no intervention with that name");
    }
    let interventionWords: InterventionWord[] = [];
    for (let word of intervention.wordList as string[]) {
      // Get the word
      let actualWord = await this.getWord(word);
      let {
        activity1,
        activity2,
        activity3,
        activity3Part2,
        activity3Part3,
        activity4,
      } = (await this.db.collection("words").doc(word).get()).data()
        ?.interventionSet as FirebaseWordIntervention;

      interventionWords.push({
        word: actualWord,
        activities: {
          a1: activity1,
          a2: activity2,
          a3: activity3,
          a3Part2: activity3Part2,
          a3Part3: activity3Part3,
          a4: activity4,
        },
      });
    }

    return {
      setId: id,
      wordList: interventionWords,
      activityIdx: intervention.activityIdx,
      wordIdx: intervention.wordIdx,
      sessionId: intervention.session,
    };
  }

  // get stats for the given user's given session
  async getStatsForSession(
    userId: string,
    sessionId: number,
    idToWord: WordMapping = new Map()
  ): Promise<SessionStats> {
    let interventionForSession = (
      await this.db
        .collection("interventions")
        .where("userId", "==", userId)
        .where("session", "==", sessionId)
        .get()
    ).docs[0];
    let assessmentForSession = (
      await this.db
        .collection("assessments")
        .where("userId", "==", userId)
        .where("session", "==", sessionId)
        .get()
    ).docs[0];

    let interventionDuration =
      !interventionForSession ||
      !interventionForSession?.data().durationsInSeconds
        ? -1
        : Math.round(interventionForSession?.data().durationsInSeconds * 100) /
          100;
    let assessmentDuration = -1;
    let correct = 0;
    let incorrect = 0;
    let wordResults: WordResult[] = [];
    let assessmentResultObjects:
      | FirebaseAssessmentResults
      | undefined = undefined;

    if (assessmentForSession !== undefined) {
      assessmentDuration =
        Math.round(assessmentForSession.data().durationsInSeconds * 100) / 100;
      let assessmentResults = assessmentForSession.data()
        .results as FirebaseAssessmentResults;
      assessmentResultObjects = assessmentResults;
      correct = Object.values(assessmentResults).filter((doc) => doc.correct)
        .length;
      incorrect = Object.values(assessmentResults).filter((doc) => !doc.correct)
        .length;
    }

    if (interventionForSession) {
      let interventionResults = (await interventionForSession.data()
        .results) as FirebaseInterventionResults;
      let interventionWords = interventionForSession.data().wordList;
      for (let word of interventionWords as string[]) {
        let actualWord = idToWord.get(word) || (await this.getWord(word));
        let currentWordAssessmentStats = assessmentResultObjects?.[word];
        let currentWordInterventionStats = interventionResults[word];
        let wordStats: WordResult = {
          word: actualWord.value,
          assessmentCorrect: currentWordAssessmentStats?.correct,
          assessmentImageSelected: currentWordAssessmentStats?.imageSelected,
          ...currentWordInterventionStats,
        };
        wordResults.push(wordStats);
      }
    }

    if (sessionId === -1) {
      for (let [id, result] of Object.entries(assessmentResultObjects ?? {})) {
        let word = idToWord.get(id) || (await this.getWord(id));
        wordResults.push({
          word: word.value,
          assessmentCorrect: result.correct,
          assessmentImageSelected: result.imageSelected,
        });
      }
    }

    return {
      userId: userId,
      sessionId: sessionId,
      interventionDuration: interventionDuration,
      assessmentDuration: assessmentDuration,
      incorrectWords: incorrect,
      correctWords: correct,
      wordResults: wordResults,
    };
  }

  async getTotalWordsLearned(userId: string | undefined): Promise<number> {
    let userIdToUse = userId ?? this.auth.currentUser?.uid;
    let allAssessments = await this.db
      .collection("assessments")
      .where("userId", "==", userIdToUse)
      .get();
    let totalWords = 0;
    for (let assessment of allAssessments.docs) {
      if (assessment.data().session === -1) {
        continue;
      }
      let results = (await assessment.data()
        .results) as FirebaseAssessmentResults;
      totalWords += Object.values(results).filter((result) => result.correct)
        .length;
    }
    return totalWords;
  }

  async createAllDataZip() {
    const zip = new JSZip();
    const folder = zip.folder("student_data");
    if (folder === null) {
      throw new Error("Error downloading data. Please try again.");
    }
    const [idToWord, students] = await Promise.all([
      this.getAllWords(),
      this.getAllStudents(),
    ]);
    const promises = students.map((student) =>
      this.getDataForOneUser(
        student.id,
        student.name,
        folder,
        idToWord
      ).catch((error) => console.log(error))
    );
    await Promise.all(promises);
    let fileBlob = await zip.generateAsync({ type: "blob" });
    window.open(URL.createObjectURL(fileBlob));
  }

  async getDataForOneUser(
    userId: string,
    name: string,
    zip: JSZip,
    idToWord: WordMapping = new Map()
  ) {
    let sessionPromises: Promise<SessionStats | undefined>[] = [];
    for (let idx = -1; idx < 8; idx++) {
      sessionPromises.push(this.getStatsForSession(userId, idx, idToWord));
    }
    const folder = zip.folder(name);
    const sessionStats = _.compact(await Promise.all(sessionPromises));
    sessionStats.forEach((stats, index) => {
      folder?.file(
        index === 0 ? "pre-assessment.csv" : `session${index}.csv`,
        this.getSessionString(stats, index === 0)
      );
    });
    folder?.file(
      "durations.csv",
      "session,type,duration\n" +
        sessionStats
          .map((session, idx) =>
            idx === 0
              ? `pre-assessment,pre-assessment,${session.assessmentDuration}`
              : (["intervention", "assessment"] as const)
                  .map(
                    (type) =>
                      `session${idx},${type},${
                        session[`${type}Duration` as const]
                      }`
                  )
                  .join("\n")
          )
          .join("\n")
    );
  }

  async createDataZip(userId: string, name: string) {
    const zip = new JSZip();
    const idToWord = await this.getAllWords();
    await this.getDataForOneUser(userId, name, zip, idToWord);
    let fileBlob = await zip.generateAsync({ type: "blob" });
    window.open(URL.createObjectURL(fileBlob));
  }

  getSessionString(session: SessionStats, preAssessment: boolean): string {
    function stringify(value: boolean | undefined): string {
      return value === undefined
        ? "incomplete"
        : value
        ? "correct"
        : "incorrect";
    }
    if (preAssessment) {
      return (
        "word,assessmentResult,assessmentImageSelected\n" +
        session.wordResults
          .map(
            ({ word, assessmentCorrect, assessmentImageSelected }) =>
              `${word},${stringify(
                assessmentCorrect
              )},${assessmentImageSelected}`
          )
          .join("\n")
      );
    }
    return (
      "word,assessmentResult,assessmentImageSelected,activity2Result,activity2ImageSelected,activity3Result,activity3Image,activity3Part2Result,activity3Part2Image,activity3Part3Result,activity3Part3Image\n" +
      session.wordResults
        .map(
          (stat) =>
            `${stat.word},${stringify(stat.assessmentCorrect)},${
              stat.assessmentImageSelected
            },${stringify(stat.activity2Correct)},${
              stat.activity2ImageSelected
            },${stringify(stat.activity3Correct)},${
              stat.activity3Image
            },${stringify(stat.activity3Part2Correct)},${
              stat.activity3Part2Image
            },${stringify(stat.activity3Part3Correct)},${
              stat.activity3Part3Image
            }`
        )
        .join("\n")
    );
  }

  async getCurrentExerciseId(wantsAssessment: boolean): Promise<string> {
    await this.createCurrentUser();
    if (this.currentUser?.onAssessment !== wantsAssessment) {
      throw new Error("oops, you cannot do this yet");
    }
    return this.currentUser!.currentInterventionOrAssessment;
  }

  async resetPassword(username: string) {
    await this.auth.sendPasswordResetEmail(userToEmail(username));
  }

  async updateUserSettings({
    newName,
    newDob,
    newPassword,
    currentPassword,
  }: UserSettings) {
    // changing sensitive fields - need to reauthenticate user
    if (newName !== undefined || newPassword !== undefined) {
      if (currentPassword !== undefined) {
        await this.reauthenticateUser(currentPassword);
        if (newName !== undefined) {
          await this.updateUserEmail(userToEmail(newName));
        }
        if (newPassword !== undefined) {
          await this.updateUserPassword(newPassword);
        }
      } else {
        throw new Error("Please enter your current password");
      }
    }
    if (newDob !== undefined) {
      await this.updateCurrentUser({ dob: newDob });
    }
    return this.getUser(undefined);
  }

  async reauthenticateUser(password: string) {
    const user = this.auth.currentUser;
    if (user !== null && user.email !== null) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );
      await user.reauthenticateWithCredential(credential);
    } else {
      await this.signOut();
    }
  }

  async updateUserEmail(newEmail: string) {
    const user = this.auth.currentUser;
    await user?.updateEmail(newEmail);
  }

  async updateUserPassword(newPassword: string) {
    const user = this.auth.currentUser;
    await user?.updatePassword(newPassword);
  }

  async signOut() {
    await this.auth.signOut();
    this.currentUser = null;
  }

  // Researcher dashboard functions

  // given a user document, returns a user object
  getUserFromData(id: string, userData: firebase.firestore.DocumentData): User {
    return {
      id: id,
      name: userData.name as string,
      accountType: userData.accountType as AccountType,
      dob: new Date(userData.dob.seconds * 1000),
      sessionId: userData.sessionId === undefined ? -1 : userData.sessionId,
      onAssessment:
        userData.onAssessment === undefined ? true : userData.onAssessment,
      currentInterventionOrAssessment:
        userData.currentInterventionOrAssessment || "oiBN8aE5tqEFK2gXJUpl",
      daysActive: userData.daysActive === undefined ? [] : userData.daysActive,
      profileIcon: userData.profileIcon ?? allProfileIcons[0],
    };
  }

  async getAllStudents(): Promise<User[]> {
    let students = (
      await this.db
        .collection("users")
        .where("accountType", "==", "STUDENT")
        .get()
    ).docs;

    return students.map((student) => {
      let studentData = student.data();
      return this.getUserFromData(student.id, studentData);
    });
  }

  async getAllWords(): Promise<WordMapping> {
    const idToWord: WordMapping = new Map();
    let words = (await this.db.collection("words").get()).docs;

    for (let word of words) {
      idToWord.set(word.id, {
        ...word.data(),
        createdAt: word.data().dateCreated.toDate(),
      } as Word);
    }

    return idToWord;
  }
}
