// script based on https://gist.github.com/zeekrey/4ca1a768ec4cc5793c3f41c88ee66eb2

const admin = require("firebase-admin");
const serviceAccount = require(`./config/${process.env.serviceAccount}`);

const firebaseConfig = {
  apiKey: "AIzaSyB3LUG_O4Ev6xOPaEKPgnyjUjUttar3PmA",
  authDomain: "vocab-buddy-53eca.firebaseapp.com",
  projectId: "vocab-buddy-53eca",
  storageBucket: "vocab-buddy-53eca.appspot.com",
  appId: "1:620084102964:web:4ea8f577f47430fb208761",
  credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(firebaseConfig);

const deleteCreatedUser = async (userEmail) => {
  admin
    .auth()
    .getUserByEmail(userEmail)
    .then(function (userRecord) {
      admin
        .auth()
        .deleteUser(userRecord.uid)
        .then(function () {
          console.log(`Successfully deleted user ${userEmail}`);
          process.exit(0);
        })
        .catch(function (error) {
          console.log(error.code);
          process.exit(1);
        });
    })
    .catch(function (error) {
      if (error.code === "auth/user-not-found") process.exit(0);
      console.log(`Error fetching user (${userEmail}) data: `, error);
      process.exit(1);
    });
};

deleteCreatedUser(process.env.userEmail);
