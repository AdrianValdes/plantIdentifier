// Set up the plants, based on the data from the database and doing some calculations
const setupPlants = (data, user) => {
  // Cheking if the user is logged
  if (data.length) {
    // Set up the plants base on the data from the database
    let allPlants = '';

    // Ciclying through the array that comes from the database (data)
    data.map((doc) => {
      //getting the content from the database
      const { name, type } = doc.data();

      const plantData = preparePlantData(doc);

      const {
        timeToNextFertilizing,
        needsFertilizing,
        timeToNextWater,
        needsWatering,
        photoURL,
      } = plantData;

      //Handle notification
      const notificationMessages = getNotifications(
        needsFertilizing,
        needsWatering
      );

      const card = preparePlantCard({
        ...plantData,
        name,
        type,
        id: doc.id,
        ...notificationMessages,
      });

      allPlants += card;
    });

    //Putting the result on the DOM
    plantList.innerHTML = allPlants;

    //In case there is not user logged in
  } else {
    if (user) {
      plantList.innerHTML =
        '<h5 class="center-align"> You have no plants. Add plants to your garden</h5>';
    } else {
      plantList.innerHTML = '';
    }
  }

  //Handeling delete of plants
  const deleteButtons = document.querySelectorAll('.delete-X');
  deleteButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
      deleteConfirm.id = e.target.id;
    });
  });

  deleteConfirm.addEventListener('click', (e) => {
    deletePlant(e.target.id);
    deleteConfirm.id = 'delete-confirm';
  });

  deleteCancel.addEventListener('click', (e) => {
    deleteConfirm.id = 'delete-confirm';
  });

  //Handeling mofification of values
  const modifyButtons = document.querySelectorAll('.modify-button');

  modifyButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
      modifyPlant(e.target.id);
    });
  });
};

function preparePlantData(doc) {
  const {
    fertilizingPeriod,
    wateringPeriod,
    lastWatering,
    lastFertilizing,
    photoURL,
  } = doc.data();
  let substitutePhotoURL = photoURL;

  //Handle Data for momentjs
  let nextWaterDate =
    moment(lastWatering).valueOf() + 1000 * 60 * 60 * 26.9 * wateringPeriod;

  let timeToNextWater = moment(nextWaterDate).fromNow();
  let needsWatering = moment().diff(nextWaterDate);

  let nextFertilizingDate =
    moment(lastFertilizing).valueOf() + 1000 * 60 * 60 * 24 * fertilizingPeriod;
  let timeToNextFertilizing = moment(nextFertilizingDate).fromNow();
  let needsFertilizing = moment().diff(nextFertilizingDate);

  if (substitutePhotoURL === undefined || substitutePhotoURL.length === 0) {
    substitutePhotoURL = 'img/Placeholder_img.png';
  }
  return {
    timeToNextFertilizing,
    needsFertilizing,
    timeToNextWater,
    needsWatering,
    photoURL: substitutePhotoURL,
  };
}

function getNotifications(needsWatering, needsFertilizing) {
  let notificationWater = '';
  let notificationFert = '';

  if (needsWatering > 0) {
    notificationWater = `&nbspWater me, please`;
  }
  if (needsFertilizing > 0) {
    notificationFert = `&nbspFertilize me, please`;
  }

  return { notificationWater, notificationFert };
}

function preparePlantCard({
  name,
  type,
  id,
  photoURL,
  timeToNextFertilizing,
  timeToNextWater,
  notificationFert,
  notificationWater,
}) {
  const card = ` 
        <div >
          <div class="card">
            <div class="card-image">
              <img  class="plant-picture" src=${photoURL}>
              <span class="card-title plant-name">${name}</span>
              <a class="modal-trigger modify-button btn-floating halfway-fab waves-effect waves-light green darken-3" data-target="modal-modifyPlant"><i id=${id}  class="material-icons">edit</i></a>
            </div>
            <div class="card-content">
            <p> The type is ${type} </p>
            <p> Next watering:  ${
              timeToNextWater === 'Invalid date' ? 'not set' : timeToNextWater
            } <span class="notification">${notificationWater}</span> </p>
            <p> Fertilize: ${
              timeToNextFertilizing === 'Invalid date'
                ? 'not set'
                : timeToNextFertilizing
            } <span class="notification">${notificationFert}</span></p>
            <p  class="delete-X modal-trigger" data-target="modal-delete" id=${id}>X</p>
            </div>
          </div>
        </div>
      </div>`;
  return card;
}
