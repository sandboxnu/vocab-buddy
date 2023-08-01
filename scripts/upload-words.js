console.log('starting word upload...')

const fs = require('fs');
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

let db = firebase.firestore();
let storage = firebase.storage();

let repositoryStartingFolder = "./words";

let allWords = fs.readdirSync(repositoryStartingFolder);

const uploadFileToFirebaseStorage = async (fileLocation, uploadName) => {
    const file = fs.readFileSync(fileLocation);
    let firebaseFile = storage.bucket().file(uploadName);
    await firebaseFile.save(file);
    await firebaseFile.makePublic();
    return firebaseFile.publicUrl();
};

const performUpload = async () => {
    for (let word of allWords) {
        if (word === ".DS_Store") {
            continue;
        }
        let wordFolder = repositoryStartingFolder + "/" + word + "/";
        let correctFolder = wordFolder + "correct/";
        let promptFolder = wordFolder + "prompts/";
        let incorrectFolder = wordFolder + "incorrect/";
        let wordRef = db.collection("words").doc();
        // Create the base assessment information
        const ids = [1, 2, 3, 4].sort((_a, _b) => Math.random() - 0.5)
        let wordBaseInfo = {
            value: word,
            correctImage: await uploadFileToFirebaseStorage(correctFolder + "correct_assessment.jpg", wordRef.id + `/assessment${ids[0]}.jpg`),
            dateCreated: new Date(),
            incorrectImages: [
                await uploadFileToFirebaseStorage(incorrectFolder + "incorrect_assessment1.jpg", wordRef.id + `/assessment${ids[1]}.jpg`),
                await uploadFileToFirebaseStorage(incorrectFolder + "incorrect_assessment2.jpg", wordRef.id + `/assessment${ids[2]}.jpg`),
                await uploadFileToFirebaseStorage(incorrectFolder + "incorrect_assessment3.jpg", wordRef.id + `/assessment${ids[3]}.jpg`),
            ],
            assessmentPrompt: await uploadFileToFirebaseStorage(promptFolder + "assessment.mp3", wordRef.id + "/assessment.mp3")
        };
        let interventionSetRef = wordRef.collection("intervention-set");

        let activity1 = {
            prompt: await uploadFileToFirebaseStorage(promptFolder + "activity1.mp3", wordRef.id + "/activity1.mp3"),
            prompt2: await uploadFileToFirebaseStorage(promptFolder + "activity1_part2.mp3", wordRef.id + "/activity1_part2.mp3"),
            url: await uploadFileToFirebaseStorage(correctFolder + "correct_activity1.jpg", wordRef.id + "/activity1.jpg")
        };

        const activity2Ids = [1, 2].sort((_a, _b) => Math.random() - 0.5)
        let activity2 = {
            prompt: await uploadFileToFirebaseStorage(promptFolder + "activity2.mp3", wordRef.id + "/activity2.mp3"),
            prompt2: await uploadFileToFirebaseStorage(promptFolder + "activity2_part2.mp3", wordRef.id + "/activity2_part2.mp3"),
            correctUrl: await uploadFileToFirebaseStorage(correctFolder + "correct_activity2.jpg", wordRef.id + `/activity2_id${activity2Ids[0]}.jpg`),
            incorrectUrl: await uploadFileToFirebaseStorage(incorrectFolder + "incorrect_activity2.jpg", wordRef.id + `/activity2_id${activity2Ids[1]}.jpg`)
        };

        // We want activity 3 shuffled, so get all values, and then shuffle
        let activity3Strings = [
            // Always 1 correct
            correctFolder + "correct_activity3.jpg", 
            // Always 1 incorrect
            incorrectFolder + "incorrect_activity3.jpg", 
            // Figure out whether it is 2 correct or incorrect
            fs.existsSync(incorrectFolder + "incorrect_activity3_2.jpg") ? incorrectFolder + "incorrect_activity3_2.jpg" : correctFolder + "correct_activity3_2.jpg"
        ];
        activity3Strings.sort((obj1, obj2) => Math.random() - 0.5);
        const activity3Ids = [1, 2, 3].sort((_a, _b) => Math.random() - 0.5)
        let allActivity3Options = [];
        for (let i in activity3Strings) {
          const activity3Option = activity3Strings[i];
          const activity3Id = activity3Ids[i];
            let lastComponent = activity3Option.substring(activity3Option.lastIndexOf("/"));
            let lastComponentWithoutSlash = lastComponent.replace("/", "")
            let lastComponentFixedName = lastComponent.replace(/(in)?correct_activity3/, "activity3_id" + activity3Id)
            allActivity3Options.push({
                correctAnswer: activity3Option.includes(correctFolder),
                url: await uploadFileToFirebaseStorage(activity3Option, wordRef.id + lastComponentFixedName),
                prompt: await uploadFileToFirebaseStorage(promptFolder + lastComponentWithoutSlash.replace("jpg", "mp3"), wordRef.id + lastComponentFixedName.replace("jpg", "mp3")),
                prompt2: await uploadFileToFirebaseStorage(promptFolder + lastComponentWithoutSlash.replace(".jpg", "_part2.mp3"), wordRef.id + lastComponentFixedName.replace(".jpg", "_part2.mp3")),
            });
        }

        let activity4 = {
            prompt: await uploadFileToFirebaseStorage(promptFolder + "activity4.mp3", wordRef.id + "/activity4.mp3"),
            prompt2: await uploadFileToFirebaseStorage(promptFolder + "activity4_part2.mp3", wordRef.id + "/activity4_part2.mp3"),
            url: await uploadFileToFirebaseStorage(correctFolder + "correct_activity4.jpg", wordRef.id + "/activity4.jpg")
        };
        // Upload everything to firebase
        console.log(`Uploading ${word} to firebase at id ${wordRef.id}`);
        await wordRef.set(wordBaseInfo);
        await interventionSetRef.doc("activity1").set(activity1);
        await interventionSetRef.doc("activity2").set(activity2);
        await interventionSetRef.doc("activity3").set(allActivity3Options[0]);
        await interventionSetRef.doc("activity3-part2").set(allActivity3Options[1]);
        await interventionSetRef.doc("activity3-part3").set(allActivity3Options[2]);
        await interventionSetRef.doc("activity4").set(activity4);
        console.log(`Successfully uploaded ${word} to firebase`);
    }
}

performUpload().then(() => console.log("done uploading words :)")).catch(console.log);