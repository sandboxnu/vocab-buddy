import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
  auth = firebase.auth();

  get currentUser() {
    return this.auth.currentUser;
  }

  /**
   * Downloads Image at the given uri.
   * This returns a promise to a downloadable url
   * @param {String} uri the uri to the image
   * @returns Promise<String>
   */
  async downloadImage(uri) {
    return await this.storage.ref().child(uri).getDownloadURL();
  }

  /**
   * Cretes an account for a user
   */
  async createAccount(email, password) {
    let userAuth = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    userAuth.user.sendEmailVerification();
  }

  async signInWithUsernameAndPassword(username, password) {
    await this.auth.signInWithEmailAndPassword(username, password);
  }
}
