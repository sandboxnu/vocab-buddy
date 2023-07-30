if (process.argv[2].match(/y(es)?/i)) {
  console.log('Confirmed. Starting the database wipe...');
} else {
  console.error('Exiting');
  process.exit();
}

const firebase = require('firebase-admin');
// To get credentials for a service account, follow instructions here and then put url to path credentials below:
// https://cloud.google.com/docs/authentication/getting-started
const serviceAccount = require('PATH_TO_CREDENTIALS');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3LUG_O4Ev6xOPaEKPgnyjUjUttar3PmA",
    authDomain: "vocab-buddy-53eca.firebaseapp.com",
    projectId: "vocab-buddy-53eca",
    storageBucket: "vocab-buddy-53eca.appspot.com",
    appId: "1:620084102964:web:4ea8f577f47430fb208761",
    credential: firebase.credential.cert(serviceAccount),
};
  
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const databases = ['assessments', 'interventions', 'words'];
const promises = databases.map(database => {
  console.log(`Deleting ${database}`);
  const dbRef = db.collection(database)
  return db.recursiveDelete(dbRef).then(() => console.log(`Deleted ${database}`));
});

console.log('Deleting media from storage bucket')
promises.push(storage.bucket().delete().then(() => console.log('Deleted media from storage bucket')));

console.log('Deleting users');
const deleteUsers = async () => {
  const userDb = db.collection('users');
  const users = (await userDb.listDocuments()).map(doc => doc.id);
  const deletedUsers = [...auth.deleteUsers(users), db.recursiveDelete(usersDb)]
  return Promise.all(deletedUsers).then(() => console.log('Deleted all users'))
}

promises.push(deleteUsers());

await Promise.all(promises);

const { exec } = require('child_process');
const child = exec('yarn upload');
child.stdout.setEncoding('utf8');
child.stdout.on('data', (message) => {
  console.log(message.toString().trim())
})