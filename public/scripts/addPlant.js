//Adding a new plant in two collections
const addPlant = document.getElementById('plant-form');
let photoURL;

addPlant.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e);
  //Add new plant to the specific user collection
  db.collection('users')
    .doc(auth.currentUser.uid)
    .collection('plants')
    .add({
      name: addPlant['plantName'].value,
      type: addPlant['plantType'].value,
      wateringPeriod: addPlant['wateringPeriod'].value,
      fertilizingPeriod: addPlant['fertilizingPeriod'].value,
      lastWatering: addPlant['datepickerWater'].value,
      lastFertilizing: addPlant['datepickerFertilizer'].value,
      photoURL: photoURL,
    })
    .then(() => {
      photoURL = '';
    })
    .catch((err) => {
      console.log(err);
    });

  //Quering the plant collection data
  db.collection('users')
    .doc(auth.currentUser.uid)
    .collection('plants')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        document.location.href = 'index.html';
      });
    });
});

/***************UPLOAD PHOTO************** */
// Listen for changes in the file selection
const fileButton = document.getElementById('fileButton');
fileButton.addEventListener('change', (e) => {
  uploadPhoto(e).then((imageURL) => {
    photoURL = imageURL;
  });
});
