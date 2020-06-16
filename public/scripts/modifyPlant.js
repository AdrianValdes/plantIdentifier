const cancelButton = document.querySelector('.cancel-button');
const fileButtonModify = document.getElementById('fileButton-modify');
let substitutePhotoURL;
cancelButton.addEventListener('click', (e) => {
  const acceptButtonModify = document.getElementsByClassName(
    'btn darken-2 z-depth-0 accept'
  );
  acceptButtonModify[0].id = 'accept-button';
});

//Handeling mofification of values
const modifyPlant = (plantId) => {
  db.collection('users')
    .doc(auth.currentUser.uid)
    .collection('plants')
    .doc(plantId)
    .get()
    .then((doc) => {
      let {
        name,
        type,
        fertilizingPeriod,
        wateringPeriod,
        lastWatering,
        lastFertilizing,
        photoURL,
      } = doc.data();

      substitutePhotoURL = photoURL;
      //Creating the modify modal from the data base

      const modifyName = document.getElementById('plantName-modifyLabel');
      const modifyType = document.getElementById('plantType-modifyLabel');
      const modifyFertPeriod = document.getElementById(
        'fertilizingPeriod-modifyLabel'
      );
      const modifyWaterPeriod = document.getElementById(
        'wateringPeriod-modifyLabel'
      );
      const modifyDateWater = document.getElementById(
        'datepickerWater-modifyLabel'
      );
      const modifyDateFert = document.getElementById(
        'datepickerFertilizer-modifyLabel'
      );

      if (lastWatering) {
        modifyPlantElement['datepickerWater-modify'].value = `${lastWatering}`;
        modifyDateWater.innerHTML = `Last Watering: ${lastWatering} `;
      }
      if (lastFertilizing) {
        modifyPlantElement[
          'datepickerFertilizer-modify'
        ].value = `${lastFertilizing}`;
        modifyDateFert.innerHTML = `Last Fertilizing: ${lastFertilizing} `;
      }
      if (fertilizingPeriod) {
        modifyPlantElement[
          'fertilizingPeriod-modify'
        ].value = `${fertilizingPeriod}`;
        modifyFertPeriod.innerHTML = `Fertilizing Period: ${fertilizingPeriod} days `;
      }
      if (wateringPeriod) {
        modifyPlantElement['wateringPeriod-modify'].value = `${wateringPeriod}`;

        modifyWaterPeriod.innerHTML = `Watering Period: ${wateringPeriod} days `;
      }

      // Filling the modal with the given info
      modifyPlantElement['plantName-modify'].value = `${name}`;
      modifyPlantElement['plantType-modify'].value = `${type}`;

      modifyName.innerHTML = `Name : ${name} `;
      modifyType.innerHTML = `Type: ${type} `;
    });
  const acceptButton = document.getElementById('accept-button');
  acceptButton.id = plantId;
};

/**********Modfiying then plant in the collection of the user***********/
let modifyPlantElement = document.getElementById('plant-form-modify');
modifyPlantElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const acceptButtonModify = document.getElementsByClassName(
    'btn darken-2 z-depth-0 accept'
  );
  plantId = acceptButtonModify[0].id;

  db.collection('users')
    .doc(auth.currentUser.uid)
    .collection('plants')
    .doc(plantId)
    .update({
      name: modifyPlantElement['plantName-modify'].value,
      type: modifyPlantElement['plantType-modify'].value,
      wateringPeriod: modifyPlantElement['wateringPeriod-modify'].value,
      fertilizingPeriod: modifyPlantElement['fertilizingPeriod-modify'].value,
      lastWatering: modifyPlantElement['datepickerWater-modify'].value,
      lastFertilizing: modifyPlantElement['datepickerFertilizer-modify'].value,
      photoURL: substitutePhotoURL,
    })
    .then(() => {
      substitutePhotoURL = '';
      const modal = document.getElementById('modal-modifyPlant');
      M.Modal.getInstance(modal).close();
      acceptButtonModify[0].id = 'accept-button';
    })
    .catch((err) => {
      console.log(err.message);
    });
});
/***************UPLOAD PHOTO************** */
// Listen for changes in the file selection

fileButtonModify.addEventListener('change', (e) => {
  uploadPhoto(e).then((imageURL) => {
    substitutePhotoURL = imageURL;
  });
});
