import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { User } from "../models/User";
import Word from "../models/Word";

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
  currentUser;

  unsubscribe;

  /** */
  waitToBeSignedIn() {
    return new Promise((resolve, reject) => {
      this.unsubscribe = this.auth.onAuthStateChanged((user) => {
        if (user != null) {
          resolve(true);
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
  async downloadImage(uri) {
    return await this.storage.ref().child(uri).getDownloadURL();
  }

  /**
   * Creates an account for a user
   */
  async createAccount(email, password, name, accountType) {
    this.unsubscribe();
    let userAuth = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.db.collection("users").doc(userAuth.user.uid).set({
      name,
      accountType,
    });
    userAuth.user.sendEmailVerification();
  }

  async signInWithUsernameAndPassword(username, password) {
    this.unsubscribe();
    await this.auth.signInWithEmailAndPassword(username, password);
    let id = this.auth.currentUser.uid;
    let user = await this.db.collection("users").doc(id).get();
    let userData = user.data();
    this.currentUser = new User(id, userData.name, userData.accountType);
  }

  /**
   * Gets all possible words.
   *
   * @returns { Promise<Array<Word>> }
   */
  async getWords() {
    let wordRef = await this.db.collection("words").get();
    let wordDocs = wordRef.docs;
    let words = [];
    for (let wordRef of wordDocs) {
      let word = wordRef.data();
      words.push(
        new Word(
          word.value,
          word.correctImage,
          word.incorrectImages,
          wordRef.id,
          word.dateCreated.toDate()
        )
      );
    }
    words.sort(
      (word1, word2) => word1.createdAt.getTime() - word2.createdAt.getTime()
    );
    return words;
  }
}
