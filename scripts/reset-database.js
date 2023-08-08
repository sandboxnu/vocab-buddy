if (process.argv[2].match(/y(es)?/i)) {
  console.log('Confirmed. Starting the database wipe...');
} else {
  console.error('Exiting');
  process.exit();
}

const resetWords = process.argv[3].match(/y(es)?/i);

const firebase = require('firebase-admin');
// To get credentials for a service account, follow instructions here and then put url to path credentials below:
// https://cloud.google.com/docs/authentication/getting-started
const serviceAccount = require('./firebase-admin.json');

// Your web app's Firebase configuration
const firebaseConfig = {
    ...require('./firebase-config.json'),
    credential: firebase.credential.cert(serviceAccount),
};
  
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


const promises = []

if (resetWords) {
  console.log('Deleting word-related-media from storage bucket')
  const wordDb = db.collection('words')
  const deleteWordMedias = async () => {
    const wordFiles = (await wordDb.get()).docs.flatMap((doc) => {
      const data = doc.data();
      return [data.assessmentPrompt, data.correctImage, ...data.incorrectImages, ...Object.values(data.interventionSet).flatMap(Object.values).filter(obj => typeof obj === 'string')].map(url => url.replace(/https\:\/\/storage\.googleapis\.com\/vocab\-buddy\-[a-z0-9]*\.appspot\.com\//, "").replace("%2F", "/"))
    })
    return Promise.all(wordFiles.map(file => storage.bucket().file(file).delete()))
  }
  promises.push(deleteWordMedias().then(() => console.log('Deleted media from storage bucket')));
}

const databasesToClear = ['assessments', 'interventions', ...resetWords ? ['words'] : []];
promises.push(...databasesToClear.map(database => {
  console.log(`Deleting ${database}`);
  const dbRef = db.collection(database)
  return db.recursiveDelete(dbRef).then(() => console.log(`Deleted ${database}`));
}));

console.log('Deleting users');
const deleteUsers = async () => {
  const usersDb = db.collection('users');
  const users = (await usersDb.listDocuments()).map(doc => doc.id);
  const deletedUsers = [auth.deleteUsers(users), db.recursiveDelete(usersDb)]
  return Promise.all(deletedUsers).then(([userDeletionResults]) => {
    console.log(`Successfully deleted ${userDeletionResults?.successCount} users from auth`)
    if (userDeletionResults?.failureCount) {
      console.err(`Failed to delete ${userDeletionResults.failureCount} users from auth: \n${userDeletionResults.errors.map(error => error.error.message).join('\n')}`)
    }
  })
}

promises.push(deleteUsers());

Promise.all(promises).then(() => {
  if (!resetWords) {
    process.exit();
  }
  const { exec } = require('child_process');
  const child = exec('yarn upload');
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (message) => {
    console.log(message.toString().trim())
  })
  child.on('exit', () => process.exit());
});