// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  databaseURL: 'xxxxxxxxxxxxxxxxxx',
  projectId: 'xxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxx',
  appId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  measurementId: 'xxxxxxxxxxx',
};
firebase.initializeApp(firebaseConfig);

//Making auth and firebase references
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
// update firestore settings
