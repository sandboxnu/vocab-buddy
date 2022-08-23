import { initializeApp } from '@firebase/app';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from '@firebase/auth';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore';
import { getDownloadURL, getStorage, ref } from '@firebase/storage';
import JSZip from 'jszip';
import { randomNumberBetween, shuffle } from '../constants/utils';
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
  UserSettings,
  Word,
  WordResult,
} from '../models/types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3LUG_O4Ev6xOPaEKPgnyjUjUttar3PmA',
  authDomain: 'vocab-buddy-53eca.firebaseapp.com',
  projectId: 'vocab-buddy-53eca',
  storageBucket: 'vocab-buddy-53eca.appspot.com',
  appId: '1:620084102964:web:4ea8f577f47430fb208761',
};

const app = initializeApp(firebaseConfig);

export const allProfileIcons = [
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fufocircle.svg?alt=media&token=267fc738-9a95-4573-adcf-e1e1c8e6bd64',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fairplanecircle.svg?alt=media&token=821f4298-66ba-4efb-92a3-f2fb6477b866',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fbicyclecircle.svg?alt=media&token=9fba5a81-15f7-497d-93bc-4f7b274bc699',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fboatcircle.svg?alt=media&token=6c3582c3-13ce-4d05-99e7-716396d00b41',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fcarcircle.svg?alt=media&token=66eb0175-a4f7-4283-8544-b08b18c0132b',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fhotairballooncircle.svg?alt=media&token=af5929aa-5676-48c8-b6cc-6e2a8a89cdbb',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Frocketcircle.svg?alt=media&token=2378a891-001b-4a7f-9522-3dffee8d202d',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Fscootercircle.svg?alt=media&token=01b70dc3-d59d-441b-aa35-47f3bc8a4aa7',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Ftraincircle.svg?alt=media&token=99b09351-0321-47d4-8a1c-45deb43f6d3b',
  'https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Ftruckcircle.svg?alt=media&token=d0c0e891-7922-4e4a-a6e7-c601ff8fc213',
];

/**
 * A class to interact with firebase. This class stores the current state,
 * including a reference to the firestore, and the current authenticated user.
 * This adds a level of abstraction around firebase, so that this is the only object dealing with the server
 */
export default class FirebaseInteractor {
  /** {@type Firestore} */
  db = getFirestore(app);

  /** {@type Storage} */
  storage = getStorage(app);

  /** {@type Auth} */
  get auth() {
    return getAuth(app);
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
    return getDownloadURL(ref(this.storage, uri));
  }

  /**
   * Creates an account for a user
   */
  async createAccount(
    email: string,
    password: string,
    name: string,
    accountType: AccountType,
    age: number | null,
  ) {
    this.unsubscribe?.apply(this);
    const userAuth = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    if (userAuth.user?.uid == null) {
      throw new Error('No actual user');
    }
    setDoc(doc(collection(this.db, 'users'), userAuth.user.uid), {
      name,
      accountType,
      age,
    });
    sendEmailVerification(userAuth.user);
    if (accountType === 'STUDENT') {
      const initialAssessmentId = await this.createInitialAssessment();
      const currentDaysActive: string[] = [];
      updateDoc(
        doc(collection(this.db, 'users'), userAuth.user.uid),
        {
          daysActive: currentDaysActive,
          currentInterventionOrAssessment: initialAssessmentId,
          sessionId: -1,
          onAssessment: true,
          profileIcon:
            allProfileIcons[
              randomNumberBetween(0, allProfileIcons.length - 1)
            ],
        },
      );
    }
  }

  async signInWithUsernameAndPassword(
    username: string,
    password: string,
  ) {
    this.unsubscribe?.apply(this);
    await signInWithEmailAndPassword(this.auth, username, password);
    await this.createCurrentUser();
  }

  async getUser(id: string | undefined): Promise<User> {
    const idToUse = id || this.auth.currentUser?.uid;
    const user = await getDoc(
      doc(collection(this.db, 'users'), idToUse),
    );
    const userData = user.data();
    if (idToUse != null && userData != null) {
      return this.getUserFromData(idToUse, userData);
    }
    throw new Error('Invalid user');
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
    await updateDoc(
      doc(collection(this.db, 'users'), this.auth.currentUser?.uid),
      user,
    );
  }

  async createInitialAssessment() {
    const words = await getDocs(collection(this.db, 'words'));
    const wordIds = words.docs.map((word) => word.id);
    const newAssessmentFields = {
      currentIndex: 0,
      durationInSeconds: 0,
      words: wordIds,
      userId: this.auth.currentUser?.uid,
      session: -1,
    };
    const newAssessment = doc(collection(this.db, 'assessments'));
    await setDoc(newAssessment, newAssessmentFields);
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
    activity3Part3Correct?: boolean,
  ) {
    const intervention = doc(
      collection(this.db, 'interventions'),
      interventions.setId,
    );

    const wordList: string[] = interventions.wordList.map(
      (word) => word.word.id,
    );
    if (activity2Correct !== undefined) {
      await setDoc(
        doc(collection(intervention, 'responses'), wordList[wordIdx]),
        { activity2Correct },
      );
    }

    if (activity3Correct !== undefined) {
      await setDoc(
        doc(collection(intervention, 'responses'), wordList[wordIdx]),
        { activity3Correct },
      );
    }

    if (activity3Part2Correct !== undefined) {
      await setDoc(
        doc(collection(intervention, 'responses'), wordList[wordIdx]),
        { activity3Part2Correct },
      );
    }

    if (activity3Part3Correct !== undefined) {
      await setDoc(
        doc(collection(intervention, 'responses'), wordList[wordIdx]),
        { activity3Part3Correct },
      );
    }

    const durationIncrement = increment(durationInSeconds);

    const object: any = {
      wordIdx,
      activityIdx,
      durationsInSeconds: durationIncrement,
    };

    updateDoc(intervention, object);
    this.updateDaysActive();
  }

  async updateDaysActive() {
    const userId = this.auth.currentUser?.uid;

    const today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    );

    await updateDoc(doc(collection(this.db, 'users'), userId), {
      daysActive: arrayUnion(today.toString()),
    });
  }

  /**
   * Creates a new assessment with all of the incorrect words from the given intervention.
   */
  async createAssessmentFromIntervention(setId: string) {
    const intervention = await getDoc(
      doc(collection(this.db, 'interventions'), setId),
    );
    const interventionData = intervention.data();
    if (interventionData == null) {
      throw new Error(`Intervention with id ${setId} does not exist`);
    }

    const { wordList } = interventionData;
    const newAssessment = doc(collection(this.db, 'assessments'));

    await this.createCurrentUser();
    const initialAssessmentFields = {
      currentIndex: 0,
      durationInSeconds: 0,
      words: wordList,
      userId: this.auth.currentUser?.uid,
      session: this.currentUser?.sessionId,
    };
    await setDoc(newAssessment, initialAssessmentFields);
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
    const assessmentRef = await getDoc(
      doc(collection(this.db, 'assessments'), firebaseId),
    );
    const assessment = assessmentRef.data();
    if (assessment == null) {
      throw new Error(
        `Assessment with id ${firebaseId} does not exist`,
      );
    }
    const { id, currentIndex, words } = assessment;

    const actualWords: Word[] = [];
    words.forEach(async (wordString: string) => {
      const wordRef = await getDoc(
        doc(collection(this.db, 'words'), wordString),
      );
      const word = wordRef.data();
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
    });
    actualWords.sort(
      (word1, word2) => word1.createdAt.getTime() - word2.createdAt.getTime(),
    );
    return {
      id,
      currentIndex,
      words: actualWords,
      firebaseId: assessment.id,
      sessionId:
        assessment.session === undefined ? -1 : assessment.session,
    };
  }

  async updateAssessment(
    id: string,
    responses: AssessmentResult[],
    currentIdx: number,
    durationInSeconds: number,
  ) {
    await Promise.all(
      responses.map((response) => setDoc(
        doc(
          collection(
            doc(collection(this.db, 'assessments'), id),
            'results',
          ),
          response.word,
        ),
        { correct: response.correct },
      )),
    );

    const durationIncrement = increment(durationInSeconds);

    await updateDoc(doc(collection(this.db, 'assessments'), id), {
      currentIndex: currentIdx,
      durationsInSeconds: durationIncrement,
    });
    this.updateDaysActive();
  }

  async createInterventionFromAssessment(
    sessionId: SessionId,
    id: string,
  ): Promise<void> {
    const documents = await getDocs(
      query(
        collection(this.db, 'interventions'),
        where('userId', '==', this.auth.currentUser?.uid),
      ),
    );
    if (documents.docs.length > 0) {
      await this.updateCurrentUser({
        sessionId:
          sessionId < 8 ? ((sessionId + 1) as SessionId) : sessionId,
        onAssessment: false,
        currentInterventionOrAssessment:
          documents.docs.filter(
            (doc) => doc.data().session === sessionId + 1,
          )[0]?.id || '',
      });
      return;
    }
    const responses = await getDocs(
      query(
        collection(
          doc(collection(this.db, 'assessments'), id),
          'results',
        ),
        where('correct', '==', false),
      ),
    );
    const incorrectWords = responses.docs.map((response) => ({
      word: response.id,
      correct: false,
    }));
    shuffle(incorrectWords);
    for (let i = 0; i < 8; i += 1) {
      // Add 3 words per intervention (wrapping around for now)
      const wordList = [
        incorrectWords[(i * 3) % incorrectWords.length].word,
        incorrectWords[(i * 3 + 1) % incorrectWords.length].word,
        incorrectWords[(i * 3 + 2) % incorrectWords.length].word,
      ];
      const newIntervention = await addDoc(
        collection(this.db, 'interventions'),
        {
          durationsInSeconds: 0,
          activityIdx: 0,
          wordIdx: 0,
          wordList,
          // Assign it to the current user
          userId: this.auth.currentUser?.uid,
          // Decide which session the intervention is in
          session: i,
        },
      );
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
    const word = (
      await getDoc(doc(collection(this.db, 'words'), id))
    ).data();
    if (word == null) {
      throw Error('This word does not exist');
    }
    return {
      value: word.value,
      correctImage: word.correctImage,
      incorrectImages: word.incorrectImages,
      id,
      createdAt: word.dateCreated.toDate(),
      assessmentPrompt: word.assessmentPrompt,
    };
  }

  async getIntervention(id: string): Promise<Interventions> {
    const interventionRef = await getDoc(
      doc(collection(this.db, 'interventions'), id),
    );
    const intervention = interventionRef.data();
    if (intervention == null) {
      throw new Error('There is no intervention with that name');
    }
    const interventionWords: InterventionWord[] = [];
    intervention.wordList.forEach(async (word: string) => {
      // Get the word
      const actualWord = await this.getWord(word);
      const wordRef = collection(
        doc(collection(this.db, 'words'), word),
        'intervention-set',
      );
      // Get each activity from firebase
      const activity1 = (
        await getDoc(doc(wordRef, 'activity1'))
      ).data() as Definition;
      const activity2 = (
        await getDoc(doc(wordRef, 'activity2'))
      ).data() as Example;
      const activity3 = (
        await getDoc(doc(wordRef, 'activity3'))
      ).data() as Context;
      const activity4 = (
        await getDoc(doc(wordRef, 'activity4'))
      ).data() as Review;
      const activity3Part2 = (
        await getDoc(doc(wordRef, 'activity3-part2'))
      ).data() as Context;
      const activity3Part3 = (
        await getDoc(doc(wordRef, 'activity3-part3'))
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
    });

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
  ): Promise<SessionStats> {
    const interventionForSession = (
      await getDocs(
        query(
          collection(this.db, 'interventions'),
          where('userId', '==', userId),
          where('session', '==', sessionId),
        ),
      )
    ).docs[0];
    const assessmentForSession = (
      await getDocs(
        query(
          collection(this.db, 'assessments'),
          where('userId', '==', userId),
          where('session', '==', sessionId),
        ),
      )
    ).docs[0];

    const interventionDuration = !interventionForSession
      || !interventionForSession?.data().durationsInSeconds
      ? 0
      : interventionForSession?.data().durationsInSeconds;
    let assessmentDuration = 0;
    let correct = 0;
    let incorrect = 0;
    const wordResults: WordResult[] = [];
    let assessmentResultObjects:
      | QuerySnapshot<DocumentData>
      | undefined;

    if (assessmentForSession !== undefined) {
      assessmentDuration = assessmentForSession.data().durationInSeconds;
      const assessmentResults = await getDocs(
        collection(assessmentForSession.ref, 'results'),
      );
      assessmentResultObjects = assessmentResults;
      correct = assessmentResults.docs.filter(
        (doc) => doc.data().correct,
      ).length;
      incorrect = assessmentResults.docs.filter(
        (doc) => !doc.data().correct,
      ).length;
    }

    if (interventionForSession) {
      const interventionResults = (
        await getDocs(
          collection(interventionForSession.ref, 'responses'),
        )
      ).docs;
      const interventionWords = interventionForSession.data().wordList;
      interventionWords.forEach(async (word: string) => {
        const actualWord = await this.getWord(word);
        const currentWordAssessmentStats = assessmentResultObjects?.docs.filter(
          (doc) => doc.id === actualWord.id,
        )[0];
        const currentWordInterventionStats = interventionResults.filter(
          (doc) => doc.id === actualWord.id,
        )[0];
        const wordStats: WordResult = {
          word: actualWord.value,
          assessmentCorrect:
            currentWordAssessmentStats?.data().correct,
          ...currentWordInterventionStats?.data(),
        };
        wordResults.push(wordStats);
      });
    }

    if (sessionId === -1) {
      assessmentResultObjects?.docs?.forEach(async (result) => {
        const word = await this.getWord(result.id);
        wordResults.push({
          word: word.value,
          assessmentCorrect: result.data().correct,
        });
      });
    }

    return {
      userId,
      sessionId,
      interventionDuration,
      assessmentDuration,
      incorrectWords: incorrect,
      correctWords: correct,
      wordResults,
    };
  }

  async getTotalWordsLearned(
    userId: string | undefined,
  ): Promise<number> {
    const userIdToUse = userId ?? this.auth.currentUser?.uid;
    const allAssessments = await getDocs(
      query(
        collection(this.db, 'assessments'),
        where('userId', '==', userIdToUse),
      ),
    );
    let totalWords = 0;
    allAssessments.docs.forEach(async (assessment) => {
      if (assessment.data().sessionId === -1) {
        return;
      }
      const results = await getDocs(
        collection(assessment.ref, 'results'),
      );
      totalWords += results.docs.filter(
        (doc) => doc.data().correct,
      ).length;
    });
    return totalWords;
  }

  async createDataZip(userId: string, name: string) {
    const sessionStats: SessionStats[] = [];
    for (let idx = -1; idx < 8; idx += 1) {
      sessionStats.push(await this.getStatsForSession(userId, idx));
    }
    const zip = new JSZip();
    const folder = zip.folder(name);
    sessionStats.forEach((stats, index) => {
      folder?.file(
        index === 0 ? 'pre-assessment.csv' : `session${index}.csv`,
        this.getSessionString(stats),
      );
    });
    const fileBlob = await zip.generateAsync({ type: 'blob' });
    window.open(URL.createObjectURL(fileBlob));
  }

  getSessionString(session: SessionStats): string {
    function stringify(value: boolean | undefined): string {
      return value === undefined
        ? 'incomplete'
        : value
          ? 'correct'
          : 'incorrect';
    }
    return `word,assessmentResult,activity2Result,activity3Result,activity3Part2Result,activity3Part3Result\n${session.wordResults
      .map(
        (stat) => `${stat.word},${stringify(
          stat.assessmentCorrect,
        )},${stringify(stat.activity2Correct)},${stringify(
          stat.activity3Correct,
        )},${stringify(stat.activity3Part2Correct)},${stringify(
          stat.activity3Part3Correct,
        )}`,
      )
      .join('\n')}`;
  }

  async getCurrentExerciseId(
    wantsAssessment: boolean,
  ): Promise<string> {
    await this.createCurrentUser();
    if (this.currentUser?.onAssessment !== wantsAssessment) {
      throw new Error('oops, you cannot do this yet');
    }
    return this.currentUser!.currentInterventionOrAssessment;
  }

  async resetPassword(email: string) {
    await sendPasswordResetEmail(this.auth, email);
  }

  async updateUserSettings({
    newName,
    newAge,
    newEmail,
    newPassword,
    currentPassword,
  }: UserSettings) {
    // changing sensitive fields - need to reauthenticate user
    if (newEmail !== undefined || newPassword !== undefined) {
      if (currentPassword !== undefined) {
        await this.reauthenticateUser(currentPassword);
        if (newEmail !== undefined) {
          await this.updateUserEmail(newEmail);
        }
        if (newPassword !== undefined) {
          await this.updateUserPassword(newPassword);
        }
      } else {
        throw new Error('Please enter your current password');
      }
    }
    if (newName !== undefined) {
      await this.updateCurrentUser({ name: newName });
    }
    if (newAge !== undefined) {
      await this.updateCurrentUser({ age: newAge });
    }
    return this.getUser(undefined);
  }

  async reauthenticateUser(password: string) {
    const user = this.auth.currentUser;
    if (user !== null && user.email !== null) {
      const credential = EmailAuthProvider.credential(
        user.email,
        password,
      );
      await reauthenticateWithCredential(user, credential);
    } else {
      await this.signOut();
    }
  }

  async updateUserEmail(newEmail: string) {
    const user = this.auth.currentUser;
    if (!user) return;
    await updateEmail(user, newEmail);
  }

  async updateUserPassword(newPassword: string) {
    const user = this.auth.currentUser;
    if (!user) return;
    await updatePassword(user, newPassword);
  }

  async signOut() {
    await this.auth.signOut();
    this.currentUser = null;
  }

  // Researcher dashboard functions

  // given a user document, returns a user object
  getUserFromData(id: string, userData: DocumentData): User {
    return {
      id,
      name: userData.name as string,
      accountType: userData.accountType as AccountType,
      age: userData.age as number,
      sessionId:
        userData.sessionId === undefined ? -1 : userData.sessionId,
      onAssessment:
        userData.onAssessment === undefined
          ? true
          : userData.onAssessment,
      currentInterventionOrAssessment:
        userData.currentInterventionOrAssessment
        || 'oiBN8aE5tqEFK2gXJUpl',
      daysActive:
        userData.daysActive === undefined ? [] : userData.daysActive,
      profileIcon: userData.profileIcon ?? allProfileIcons[0],
    };
  }

  async getAllStudents(): Promise<User[]> {
    const students = (
      await getDocs(
        query(
          collection(this.db, 'users'),
          where('accountType', '==', 'STUDENT'),
        ),
      )
    ).docs;

    return students.map((student) => {
      const studentData = student.data();
      return this.getUserFromData(student.id, studentData);
    });
  }
}
