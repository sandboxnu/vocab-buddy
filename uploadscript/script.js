const fs = require('fs');
const firebase = require('firebase-admin');
// To get credentials for a service account,
// follow instructions here and then put url to path credentials below:
// https://cloud.google.com/docs/authentication/getting-started
const serviceAccount = require('./firebase-admin.json');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3LUG_O4Ev6xOPaEKPgnyjUjUttar3PmA',
  authDomain: 'vocab-buddy-53eca.firebaseapp.com',
  projectId: 'vocab-buddy-53eca',
  storageBucket: 'vocab-buddy-53eca.appspot.com',
  appId: '1:620084102964:web:4ea8f577f47430fb208761',
  credential: firebase.credential.cert(serviceAccount),
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const repositoryStartingFolder = './words';

const allWords = fs.readdirSync(repositoryStartingFolder);

const uploadFileToFirebaseStorage = async (fileLocation, uploadName) => {
  const file = fs.readFileSync(fileLocation);
  const firebaseFile = storage.bucket().file(uploadName);
  await firebaseFile.save(file);
  await firebaseFile.makePublic();
  return firebaseFile.publicUrl();
};

/* eslint-disable no-await-in-loop */

const performUpload = async () => {
  allWords.forEach(async (word) => {
    if (word === '.DS_Store') {
      return;
    }
    const wordFolder = `${repositoryStartingFolder}/${word}/`;
    const correctFolder = `${wordFolder}correct/`;
    const promptFolder = `${wordFolder}prompts/`;
    const incorrectFolder = `${wordFolder}incorrect/`;
    const wordRef = db.collection('words').doc();
    // Create the base assessment information
    const wordBaseInfo = {
      value: word,
      correctImage: await uploadFileToFirebaseStorage(
        `${correctFolder}correct_assessment.jpg`,
        `${wordRef.id}/correct_assessment.jpg`,
      ),
      dateCreated: new Date(),
      incorrectImages: [
        await uploadFileToFirebaseStorage(
          `${incorrectFolder}incorrect_assessment1.jpg`,
          `${wordRef.id}/incorrect_assessment1.jpg`,
        ),
        await uploadFileToFirebaseStorage(
          `${incorrectFolder}incorrect_assessment2.jpg`,
          `${wordRef.id}/incorrect_assessment2.jpg`,
        ),
        await uploadFileToFirebaseStorage(
          `${incorrectFolder}incorrect_assessment3.jpg`,
          `${wordRef.id}/incorrect_assessment3.jpg`,
        ),
      ],
      assessmentPrompt: await uploadFileToFirebaseStorage(
        `${promptFolder}assessment.mp3`,
        `${wordRef.id}/assessment.mp3`,
      ),
    };
    const interventionSetRef = wordRef.collection('intervention-set');

    const activity1 = {
      prompt: await uploadFileToFirebaseStorage(
        `${promptFolder}activity1.mp3`,
        `${wordRef.id}/activity1.mp3`,
      ),
      prompt2: await uploadFileToFirebaseStorage(
        `${promptFolder}activity1_part2.mp3`,
        `${wordRef.id}/activity1_part2.mp3`,
      ),
      url: await uploadFileToFirebaseStorage(
        `${correctFolder}correct_activity1.jpg`,
        `${wordRef.id}/correct_activity1.jpg`,
      ),
    };

    const activity2 = {
      prompt: await uploadFileToFirebaseStorage(
        `${promptFolder}activity2.mp3`,
        `${wordRef.id}/activity2.mp3`,
      ),
      prompt2: await uploadFileToFirebaseStorage(
        `${promptFolder}activity2_part2.mp3`,
        `${wordRef.id}/activity2_part2.mp3`,
      ),
      correctUrl: await uploadFileToFirebaseStorage(
        `${correctFolder}correct_activity2.jpg`,
        `${wordRef.id}/correct_activity2.jpg`,
      ),
      incorrectUrl: await uploadFileToFirebaseStorage(
        `${incorrectFolder}incorrect_activity2.jpg`,
        `${wordRef.id}/incorrect_activity2.jpg`,
      ),
    };

    // We want activity 3 shuffled, so get all values, and then shuffle
    const activity3Strings = [
      // Always 1 correct
      `${correctFolder}correct_activity3.jpg`,
      // Always 1 incorrect
      `${incorrectFolder}incorrect_activity3.jpg`,
      // Figure out whether it is 2 correct or incorrect
      fs.existsSync(`${incorrectFolder}incorrect_activity3_2.jpg`)
        ? `${incorrectFolder}incorrect_activity3_2.jpg`
        : `${correctFolder}correct_activity3_2.jpg`,
    ];
    activity3Strings.sort(() => Math.random() - 0.5);
    const allActivity3Options = [];
    activity3Strings.forEach(async (activity3Option) => {
      const lastComponent = activity3Option.substring(
        activity3Option.lastIndexOf('/'),
      );
      const lastComponentWithoutSlash = lastComponent.replace('/', '');
      console.log(lastComponent);
      allActivity3Options.push({
        correctAnswer: activity3Option.includes(correctFolder),
        url: await uploadFileToFirebaseStorage(
          activity3Option,
          wordRef.id + lastComponent,
        ),
        prompt: await uploadFileToFirebaseStorage(
          promptFolder + lastComponentWithoutSlash.replace('jpg', 'mp3'),
          wordRef.id + lastComponent.replace('jpg', 'mp3'),
        ),
        prompt2: await uploadFileToFirebaseStorage(
          promptFolder
            + lastComponentWithoutSlash.replace('.jpg', '_part2.mp3'),
          wordRef.id + lastComponent.replace('.jpg', '_part2.mp3'),
        ),
      });
    });

    const activity4 = {
      prompt: await uploadFileToFirebaseStorage(
        `${promptFolder}activity4.mp3`,
        `${wordRef.id}/activity4.mp3`,
      ),
      prompt2: await uploadFileToFirebaseStorage(
        `${promptFolder}activity4_part2.mp3`,
        `${wordRef.id}/activity4_part2.mp3`,
      ),
      url: await uploadFileToFirebaseStorage(
        `${correctFolder}correct_activity4.jpg`,
        `${wordRef.id}/correct_activity4.jpg`,
      ),
    };
    // Upload everything to firebase
    console.log(`Uploading ${word} to firebase at id ${wordRef.id}`);
    await wordRef.set(wordBaseInfo);
    await interventionSetRef.doc('activity1').set(activity1);
    await interventionSetRef.doc('activity2').set(activity2);
    await interventionSetRef.doc('activity3').set(allActivity3Options[0]);
    await interventionSetRef.doc('activity3-part2').set(allActivity3Options[1]);
    await interventionSetRef.doc('activity3-part3').set(allActivity3Options[2]);
    await interventionSetRef.doc('activity4').set(activity4);
    console.log(`Successfully uploaded ${word} to firebase`);
  });
};

/* eslint-enable no-await-in-loop */

performUpload()
  .then(() => console.log('done :)'))
  .catch(console.log);
