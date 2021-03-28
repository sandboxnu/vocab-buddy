import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { randomNumberBetween, shuffle } from "../constants/utils";
import {
  AccountType,
  Assessment,
  AssessmentResult,
  Context,
  Definition,
  Example,
  Interventions,
  InterventionWord,
  Review,
  SessionId,
  SessionStats,
  User,
  Word,
} from "../models/types";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB3LUG_O4Ev6xOPaEKPgnyjUjUttar3PmA",
  authDomain: "vocab-buddy-53eca.firebaseapp.com",
  projectId: "vocab-buddy-53eca",
  storageBucket: "vocab-buddy-53eca.appspot.com",
  appId: "1:620084102964:web:4ea8f577f47430fb208761",
};

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
    email: string,
    password: string,
    name: string,
    accountType: AccountType,
    age: Number | null
  ) {
    this.unsubscribe?.apply(this);
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
      age,
    });
    userAuth.user.sendEmailVerification();
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
    await this.auth.signInWithEmailAndPassword(username, password);
    await this.createCurrentUser();
  }

  async getUser(id: string | undefined): Promise<User> {
    let idToUse = id || this.auth.currentUser?.uid;
    let user = await this.db.collection("users").doc(idToUse).get();
    let userData = user.data();
    if (idToUse != null && userData != null) {
      return this.getUserFromData(userData);
    } else {
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
    this.db.collection("users").doc(this.auth.currentUser?.uid).update(user);
  }

  async createInitialAssessment() {
    let words = await this.db.collection("words").get();
    let wordIds = words.docs.map((word) => word.id);
    let newAssessmentFields = {
      currentIndex: 0,
      durationInSeconds: 0,
      words: wordIds,
      userId: this.auth.currentUser?.uid,
      session: -1,
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
    durationInSeconds: number,
    activity2Correct?: boolean,
    activity3Correct?: boolean,
    activity3Part2Correct?: boolean,
    activity3Part3Correct?: boolean
  ) {
    let intervention = this.db
      .collection("interventions")
      .doc(interventions.setId);

    let wordList: string[] = interventions.wordList.map((word) => word.word.id);
    if (activity2Correct !== undefined) {
      await intervention.collection("responses").doc(wordList[wordIdx]).set({
        activity2Correct,
      });
    }

    if (activity3Correct !== undefined) {
      await intervention.collection("responses").doc(wordList[wordIdx]).update({
        activity3Correct,
      });
    }

    if (activity3Part2Correct !== undefined) {
      await intervention.collection("responses").doc(wordList[wordIdx]).update({
        activity3Part2Correct,
      });
    }

    if (activity3Part3Correct !== undefined) {
      await intervention.collection("responses").doc(wordList[wordIdx]).update({
        activity3Part3Correct,
      });
    }

    const increment = firebase.firestore.FieldValue.increment(
      durationInSeconds
    );

    let object: any = {
      wordIdx,
      activityIdx,
      durationsInSeconds: increment,
    };

    intervention.update(object);
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
   * Creates a new assessment with all of the incorrect words from the given intervention.
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
      durationInSeconds: 0,
      words: wordList,
      userId: this.auth.currentUser?.uid,
      session: this.currentUser?.sessionId,
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
      });
    }
    actualWords.sort(
      (word1, word2) => word1.createdAt.getTime() - word2.createdAt.getTime()
    );
    return {
      id,
      currentIndex,
      words: actualWords,
      firebaseId: assessment.id,
      sessionId: assessment.session === undefined ? -1 : 0,
    };
  }

  async updateAssessment(
    id: string,
    responses: AssessmentResult[],
    currentIdx: number,
    durationInSeconds: number
  ) {
    await Promise.all(
      responses.map(async (response) => {
        return await this.db
          .collection("assessments")
          .doc(id)
          .collection("results")
          .doc(response.word)
          .set({ correct: response.correct });
      })
    );

    const increment = firebase.firestore.FieldValue.increment(
      durationInSeconds
    );

    await this.db.collection("assessments").doc(id).update({
      currentIndex: currentIdx,
      durationInSeconds: increment,
    });
    this.updateDaysActive();
  }

  async createInterventionFromAssessment(
    sessionId: SessionId,
    responses: AssessmentResult[]
  ): Promise<void> {
    let documents = await this.db
      .collection("interventions")
      .where("userId", "==", this.auth.currentUser?.uid)
      .get();
    if (documents.docs.length > 0) {
      await this.updateCurrentUser({
        sessionId: sessionId < 9 ? ((sessionId + 1) as SessionId) : sessionId,
        onAssessment: false,
        currentInterventionOrAssessment: documents.docs.filter(
          (doc) => doc.data().session === sessionId + 1
        )[0]?.id,
      });
      return;
    }
    let incorrectWords = responses.filter((response) => !response.correct);
    shuffle(incorrectWords);
    for (let i = 0; i < 8; i++) {
      // Add 3 words per intervention (wrapping around for now)
      let wordList = [
        incorrectWords[(i * 3) % incorrectWords.length].word,
        incorrectWords[(i * 3 + 1) % incorrectWords.length].word,
        incorrectWords[(i * 3 + 2) % incorrectWords.length].word,
      ];
      let newIntervention = await this.db.collection("interventions").add({
        activityIdx: 0,
        wordIdx: 0,
        wordList,
        // Assign it to the current user
        userId: this.auth.currentUser?.uid,
        // Decide which session the intervention is in
        session: i,
      });
      if (i === 0) {
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
      let wordRef = this.db
        .collection("words")
        .doc(word)
        .collection("intervention-set");
      // Get each activity from firebase
      let activity1 = (
        await wordRef.doc("activity1").get()
      ).data() as Definition;
      let activity2 = (await wordRef.doc("activity2").get()).data() as Example;
      let activity3 = (await wordRef.doc("activity3").get()).data() as Context;
      let activity4 = (await wordRef.doc("activity4").get()).data() as Review;
      let activity3Part2 = (
        await wordRef.doc("activity3-part2").get()
      ).data() as Context;
      let activity3Part3 = (
        await wordRef.doc("activity3-part3").get()
      ).data() as Context;
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
    sessionId: number
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

    if (interventionForSession == null) {
      throw new Error(
        `User ${userId} does not have both an intervention and assessment for session ${sessionId}`
      );
    }

    if (assessmentForSession == null) {
      throw new Error(
        ` aaa User ${userId} does not have both an intervention and assessment for session ${sessionId}`
      );
    }

    let intervetionDuration = interventionForSession.data().durationsInSeconds;
    let assessmentDuration = assessmentForSession.data().durationsInSeconds;
    console.log(interventionForSession.data());
    return {
      interventionDuration: intervetionDuration,
      assessmentDuration: assessmentDuration,
      incorrectWords: 1,
      correctWords: 1,
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
      if (assessment.data().sessionId === -1) {
        continue;
      }
      let results = await assessment.ref.collection("results").get();
      totalWords += results.docs.filter((doc) => doc.data().correct).length;
    }
    return totalWords;
  }

  async getCurrentExerciseId(wantsAssessment: boolean): Promise<string> {
    await this.createCurrentUser();
    if (this.currentUser?.onAssessment !== wantsAssessment) {
      throw new Error("oops, you cannot do this yet");
    }
    return this.currentUser!.currentInterventionOrAssessment;
  }

  async resetPassword(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async signOut() {
    await this.auth.signOut();
    this.currentUser = null;
  }

  // Researcher dashboard functions

  // given a user document, returns a user object
  getUserFromData(userData: firebase.firestore.DocumentData): User {
    return {
      id: userData.id,
      name: userData.name as string,
      accountType: userData.accountType as AccountType,
      age: userData.age as number,
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
      return this.getUserFromData(studentData);
    });
  }
}
