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

const findFileLocation = (fileLocation) => {
  if (fs.existsSync(fileLocation)) {
    return fileLocation;
  }
  if (fileLocation.endsWith(".jpg") && fs.existsSync(fileLocation.replace(".jpg", ".jpeg"))) {
    return fileLocation.replace(".jpg", ".jpeg")
  } else if (fs.existsSync(fileLocation.replace("prompts/", "prompt/"))) {
    return fileLocation.replace("prompts/", "prompt/");
  } else if (fs.existsSync(fileLocation.replace("prompts/", "prompts /"))) {
    return fileLocation.replace("prompts/", "prompts /");
  } else if (fs.existsSync(fileLocation.replace("activity", "activity_"))) {
    return fileLocation.replace("activity", "activity_");
  } else if (fs.existsSync(fileLocation.replace(/(activity[0-9]_[0-9])_part2/, "$1part2"))) {
    return fileLocation.replace(/(activity[0-9]_[0-9])_part2/, "$1part2");
  } else if (fs.existsSync(fileLocation.replace("_part2.mp3", "_part.mp3"))) {
    return fileLocation.replace("_part2.mp3", "_part.mp3");
  }
  return fileLocation
}

const uploadFileToFirebaseStorage = async (fileLocation, uploadName) => {
  const foundFile = findFileLocation(fileLocation)
    const file = fs.readFileSync(foundFile);
    let firebaseFile = storage.bucket().file(uploadName);
    return firebaseFile.save(file, { resumable: false, validation: false, public: true }).then(() => firebaseFile.publicUrl());
};

const performUpload = async () => {
  const uploadWord = async (word) => {
        if (word === ".DS_Store") {
          return Promise.resolve();
        }
        let wordFolder = repositoryStartingFolder + "/" + word + "/";
        let correctFolder = wordFolder + "correct/";
        let promptFolder = wordFolder + "prompts/";
        let incorrectFolder = wordFolder + "incorrect/";
        let wordRef = db.collection("words").doc();

        const promises = []

        // Create the base assessment information
        const ids = [1, 2, 3, 4].sort((_a, _b) => Math.random() - 0.5)
        let wordBaseInfo = {
            value: word,
            correctImage: uploadFileToFirebaseStorage(correctFolder + "correct_assessment.jpg", wordRef.id + `/assessment${ids[0]}.jpg`),
            dateCreated: new Date(),
            incorrectImages: [
                uploadFileToFirebaseStorage(incorrectFolder + "incorrect_assessment1.jpg", wordRef.id + `/assessment${ids[1]}.jpg`),
                uploadFileToFirebaseStorage(incorrectFolder + "incorrect_assessment2.jpg", wordRef.id + `/assessment${ids[2]}.jpg`),
                uploadFileToFirebaseStorage(incorrectFolder + "incorrect_assessment3.jpg", wordRef.id + `/assessment${ids[3]}.jpg`),
            ],
            assessmentPrompt: uploadFileToFirebaseStorage(promptFolder + "assessment.mp3", wordRef.id + "/assessment.mp3")
        };

        promises.push(wordBaseInfo.correctImage, ...wordBaseInfo.incorrectImages, wordBaseInfo.assessmentPrompt)
              
        let activity1 = {
            prompt: uploadFileToFirebaseStorage(promptFolder + "activity1.mp3", wordRef.id + "/activity1.mp3"),
            prompt2: uploadFileToFirebaseStorage(promptFolder + "activity1_part2.mp3", wordRef.id + "/activity1_part2.mp3"),
            url: uploadFileToFirebaseStorage(correctFolder + "correct_activity1.jpg", wordRef.id + "/activity1.jpg")
        };

        promises.push(...Object.values(activity1))

        const activity2Ids = [1, 2].sort((_a, _b) => Math.random() - 0.5)
        let activity2 = {
            prompt: uploadFileToFirebaseStorage(promptFolder + "activity2.mp3", wordRef.id + "/activity2.mp3"),
            prompt2: uploadFileToFirebaseStorage(promptFolder + "activity2_part2.mp3", wordRef.id + "/activity2_part2.mp3"),
            correctUrl: uploadFileToFirebaseStorage(correctFolder + "correct_activity2.jpg", wordRef.id + `/activity2_id${activity2Ids[0]}.jpg`),
            incorrectUrl: uploadFileToFirebaseStorage(incorrectFolder + "incorrect_activity2.jpg", wordRef.id + `/activity2_id${activity2Ids[1]}.jpg`)
        };

        promises.push(Object.values(activity2))

        // We want activity 3 shuffled, so get all values, and then shuffle
        let activity3Strings = [
            // Always 1 correct
            correctFolder + "correct_activity3.jpg", 
            // Always 1 incorrect
            incorrectFolder + "incorrect_activity3.jpg", 
            // Figure out whether it is 2 correct or incorrect
            fs.existsSync(findFileLocation(incorrectFolder + "incorrect_activity3_2.jpg")) ? incorrectFolder + "incorrect_activity3_2.jpg" : correctFolder + "correct_activity3_2.jpg"
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
                url: uploadFileToFirebaseStorage(activity3Option, wordRef.id + lastComponentFixedName),
                prompt: uploadFileToFirebaseStorage(promptFolder + lastComponentWithoutSlash.replace("jpg", "mp3"), wordRef.id + lastComponentFixedName.replace("jpg", "mp3")),
                prompt2: uploadFileToFirebaseStorage(promptFolder + lastComponentWithoutSlash.replace(".jpg", "_part2.mp3"), wordRef.id + lastComponentFixedName.replace(".jpg", "_part2.mp3")),
            });
        }

        promises.push(...allActivity3Options.flatMap(obj => [obj.url, obj.prompt, obj.prompt2]))

        let activity4 = {
            prompt: uploadFileToFirebaseStorage(promptFolder + "activity4.mp3", wordRef.id + "/activity4.mp3"),
            prompt2: uploadFileToFirebaseStorage(promptFolder + "activity4_part2.mp3", wordRef.id + "/activity4_part2.mp3"),
            url: uploadFileToFirebaseStorage(correctFolder + "correct_activity4.jpg", wordRef.id + "/activity4.jpg")
        };
        promises.push(...Object.values(activity4))
        
        // Upload everything to firebase
        console.log(`Uploading ${word} to firebase at id ${wordRef.id}`);
        await Promise.all(promises)

        const resolvePropertyPromises = async (obj) => Object.fromEntries(await Promise.all(Object.entries(obj).map(async ([key, value]) => [key, await (Array.isArray(value) ? Promise.all(value) : Promise.resolve(value))])))

        await wordRef.set({
          ...(await resolvePropertyPromises(wordBaseInfo)),
          interventionSet: {
            activity1: await resolvePropertyPromises(activity1),
            activity2: await resolvePropertyPromises(activity2),
            activity3: await resolvePropertyPromises(allActivity3Options[0]),
            activity3Part2: await resolvePropertyPromises(allActivity3Options[1]),
            activity3Part3: await resolvePropertyPromises(allActivity3Options[2]),
            activity4: await resolvePropertyPromises(activity4)
          }
        });
        console.log(`Successfully uploaded ${word} to firebase`);
  }

  for (const word of allWords) {
    try {
      await uploadWord(word)
    } catch (err) {
      console.error(`Error uploading ${word}:\n${err}`);
    }
  }
}

performUpload().then(() => console.log("done uploading words :)")).catch(console.error);