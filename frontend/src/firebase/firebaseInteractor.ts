import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { AccountType, Assessment, Context, Definition, Example, Interventions, InterventionWord, Review, User, Word } from "../models/types";

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
          this.createCurrentUser()
          .then(_ => {
            resolve(true);
          })
          
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
   * Gets all possible words.
   *
   * @returns { Promise<Assessment> }
   */
  async getAssessment(): Promise<Assessment> {
    let assessmentRef = await this.db.collection("assessments").get();
    let assessmentDocs = assessmentRef.docs;
    // Hardcoding first assessment for now
    let assessment = assessmentDocs[0];
    let { id, currentIndex } = assessment.data();
    let wordPath = `assessments/${assessment.id}/words`;
    let wordRef = await this.db.collection(wordPath).get();
    let wordDocs = wordRef.docs;

    let words: Word[] = [];
    for (let wordRef of wordDocs) {
      let word = wordRef.data();
      words.push({
        value: word.value,
        correctImage: word.correctImage,
        incorrectImages: word.incorrectImages,
        id: wordRef.id,
        createdAt: word.dateCreated.toDate(),
      });
    }
    words.sort(
      (word1, word2) => word1.createdAt.getTime() - word2.createdAt.getTime()
    );
    return { id, currentIndex, words };
  }

  async getWord(id: string) : Promise<Word> {
    let word = (await this.db.collection("words").doc(id).get()).data();
    if (word == null) {
      throw Error("This word does not exist");
    }
    return {
      value: word.value,
      correctImage: word.correctImage,
      incorrectImages: word.incorrectImages,
      id: id,
      createdAt: word.dateCreated.toDate()
    }
  }

  async getIntervention(id: string) : Promise<Interventions> {
    let interventionRef = await this.db.collection("interventions").doc(id).get();
    let intervention = interventionRef.data();
    if (intervention == null) {
      throw new Error("There is no intervention with that name");
    }
    let interventionWords : InterventionWord[] = [];
    for (let word of intervention.wordList as string[]) {
      // Get the word
      let actualWord = await this.getWord(word);
      // Get each activity from firebase
      let activity1 = (await interventionRef.ref.collection(word).doc("activity1").get()).data() as Definition;
      let activity2 = (await interventionRef.ref.collection(word).doc("activity2").get()).data() as Example;
      let activity3 = (await interventionRef.ref.collection(word).doc("activity3").get()).data() as Context;
      let activity4 = (await interventionRef.ref.collection(word).doc("activity4").get()).data() as Review;
      interventionWords.push({
        word: actualWord,
        activities: {
          a1: activity1,
          a2: activity2,
          a3: activity3,
          a4: activity4
        }
      });
    }

    return {
      wordList : interventionWords,
      activityIdx: intervention.activityIdx,
      wordIdx: intervention.wordIdx
    }
  }

  async resetPassword(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }
}
