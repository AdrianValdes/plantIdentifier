// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBhO1-0x1dNgq0OJn8BlcCdox55iI2nkXA',
  authDomain: 'plantproject-2df69.firebaseapp.com',
  databaseURL: 'https://plantproject-2df69.firebaseio.com',
  projectId: 'plantproject-2df69',
  storageBucket: 'plantproject-2df69.appspot.com',
  messagingSenderId: '238576766779',
  appId: '1:238576766779:web:7fb52369f42d4b1cedf11e',
  measurementId: 'G-HMX47EXZR1',
};
firebase.initializeApp(firebaseConfig);

//Making auth and firebase references
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
// update firestore settings
