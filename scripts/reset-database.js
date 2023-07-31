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
    const wordIds = (await wordDb.listDocuments()).map(doc => doc.id)
    return Promise.all(wordIds.map(id => storage.bucket().file(id).delete()))
  }
  promises.push(deleteWordMedias.then(() => console.log('Deleted media from storage bucket')));
}

const databasesToClear = ['assessments', 'interventions', ...resetWords ? ['words'] : []];
promises.push(...databasesToClear.map(database => {
  console.log(`Deleting ${database}`);
  const dbRef = db.collection(database)
  return db.recursiveDelete(dbRef).then(() => console.log(`Deleted ${database}`));
}));

console.log('Deleting users');
const deleteUsers = async () => {
  const userDb = db.collection('users');
  const users = (await userDb.listDocuments()).map(doc => doc.id);
  const deletedUsers = [...auth.deleteUsers(users), db.recursiveDelete(usersDb)]
  return Promise.all(deletedUsers).then(() => console.log('Deleted all users'))
}

promises.push(deleteUsers());

Promise.all(promises).then(() => {
  if (!resetWords) return;
  const { exec } = require('child_process');
  const child = exec('yarn upload');
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (message) => {
    console.log(message.toString().trim())
  })
});