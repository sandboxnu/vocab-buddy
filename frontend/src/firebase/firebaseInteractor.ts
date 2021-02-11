import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { shuffle } from "../constants/utils";
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
  }

  async signInWithUsernameAndPassword(username: string, password: string) {
    this.unsubscribe?.apply(this);
    await this.auth.signInWithEmailAndPassword(username, password);
    await this.createCurrentUser();
  }

  async createCurrentUser() {
    let id = this.auth.currentUser?.uid;
    let user = await this.db.collection("users").doc(id).get();
    let userData = user.data();
    if (id != null && userData != null) {
      this.currentUser = {
        id: id,
        name: userData.name as string,
        accountType: userData.accountType as AccountType,
        age: userData.age as number,
      };
    }
  }

  /**
   * update intervention idx number
   */
  async updateIntervention(
    setId: string,
    wordIdx: number,
    activityIdx: number
  ) {
    let intervention = await this.db.collection("interventions").doc(setId);
    intervention.update({
      wordIdx,
      activityIdx,
    });
  }

  /**
   * Creates a new assessment with all of the words from a given intervention.
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

    let initialAssessmentFields = {
      currentIndex: 0,
      durationInSeconds: 0,
      words: wordList,
      userId: this.auth.currentUser?.uid,
    };
    await newAssessment.set(initialAssessmentFields);
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
    // Hardcoding first assessment for now
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
    return { id, currentIndex, words: actualWords, firebaseId: assessment.id };
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
  }

  async createInterventionFromAssessment(
    responses: AssessmentResult[]
  ): Promise<void> {
    let documents = await this.db
      .collection("interventions")
      .where("userId", "==", this.auth.currentUser?.uid)
      .get();
    if (documents.docs.length > 0) {
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
      await this.db.collection("interventions").add({
        activityIdx: 0,
        wordIdx: 0,
        wordList,
        // Assign it to the current user
        userId: this.auth.currentUser?.uid,
        // Decide which session the intervention is in
        session: i,
      });
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
      interventionWords.push({
        word: actualWord,
        activities: {
          a1: activity1,
          a2: activity2,
          a3: activity3,
          a4: activity4,
        },
      });
    }

    return {
      setId: id,
      wordList: interventionWords,
      activityIdx: intervention.activityIdx,
      wordIdx: intervention.wordIdx,
    };
  }

  async resetPassword(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async signOut() {
    await this.auth.signOut();
    this.currentUser = null;
  }
}
