/**************IDENTIFY FUNCTIONALITY ****************/

// Handle identify from
const preloader = document.getElementById('preloader');
const searchPlantForm = document.getElementById('search-plant-form');
const searchPlantInput = document.getElementById('search-plant-file');
const radioButtons = document.getElementsByName('group1');
const loadingMessage = document.getElementById('loading-message');
const identifyPanel = document.getElementsByClassName('identify-panel')[0];

searchPlantForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let organValue;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      organValue = radioButtons[i].value;
    }
  }

  const selectedPicture = searchPlantInput.files[0];
  identifyPanel.style.display = 'none';

  plantNetUploaded(selectedPicture, organValue);
  preloader.style.display = 'block';
  loadingMessage.style.display = 'block';
});

async function plantNetUploaded(selectedPicture, organValue) {
  let apiKey = '2a10fPPhvbHD2cAR0tYSOb16O';

  // required because my-api.planetnet.org does not set CORS headers
  let corsProxy = 'https://cors-anywhere.herokuapp.com/';

  // plantnet API expects FormData (multipart/form-data)
  let form = new FormData();
  form.append('organs', organValue);
  form.append('images', selectedPicture);
  try {
    let reply = await fetch(
      corsProxy +
        'https://my-api.plantnet.org/v2/identify/all?api-key=' +
        apiKey,
      {
        body: form,
        method: 'POST',
      }
    );
    let response = await reply.json();

    let gbif = response.results[0].gbif.id;

    generateUIResults(response.results[0].species, gbif);
  } catch (err) {
    console.log(err.message);
    handleError(err.message);
  }
}

function handleError(err) {
  preloader.style.display = 'none';
  loadingMessage.style.display = 'none';

  let errorContainer = document.createElement('div');
  errorContainer.classList.add('container');
  searchedPlantsResult.appendChild(errorContainer);
  let errorMessage = document.createElement('h4');
  errorMessage.classList.add('headers-plant-result');
  errorMessage.textContent = 'There has been an error';
  errorContainer.appendChild(errorMessage);

  let specificError = document.createElement('div');
  /* specificError.classList.add('searched-plant-results'); */
  specificError.textContent = err;
  errorContainer.appendChild(specificError);
  createReloadBtn(errorContainer);
}

function generateUIResults(plantResponse, gbif) {
  preloader.style.display = 'none';
  loadingMessage.style.display = 'none';
  const {
    commonNames,
    family,
    genus,
    scientificNameWithoutAuthor,
  } = plantResponse;

  let scientificNameContainer = document.createElement('div');
  scientificNameContainer.classList.add('container');
  searchedPlantsResult.appendChild(scientificNameContainer);
  let scientificNameHeader = document.createElement('h4');
  scientificNameHeader.classList.add('headers-plant-results');
  scientificNameHeader.textContent = 'Scientific Name';
  scientificNameContainer.appendChild(scientificNameHeader);
  let plantScientificName = document.createElement('div');
  plantScientificName.classList.add('searched-plant-results');
  plantScientificName.textContent = scientificNameWithoutAuthor;
  scientificNameContainer.appendChild(plantScientificName);

  let commonNameContainer = document.createElement('div');
  commonNameContainer.classList.add('container');
  searchedPlantsResult.appendChild(commonNameContainer);

  let commonNameHeader = document.createElement('h4');
  commonNameHeader.classList.add('headers-plant-results');
  commonNameHeader.textContent = 'Common Names';
  commonNameContainer.appendChild(commonNameHeader);

  commonNames.forEach((name) => {
    let plantCommonName = document.createElement('div');
    plantCommonName.classList.add('searched-plant-results');
    plantCommonName.textContent = name;
    commonNameContainer.appendChild(plantCommonName);
  });

  let familyContainer = document.createElement('div');
  familyContainer.classList.add('container');
  searchedPlantsResult.appendChild(familyContainer);
  let familyNameHeader = document.createElement('h4');
  familyNameHeader.classList.add('headers-plant-results');
  familyNameHeader.textContent = 'Plant Family';
  familyContainer.appendChild(familyNameHeader);
  let plantFamilyName = document.createElement('div');
  plantFamilyName.classList.add('searched-plant-results');
  plantFamilyName.textContent = family.scientificNameWithoutAuthor;
  familyContainer.appendChild(plantFamilyName);

  let genusContainer = document.createElement('div');
  genusContainer.classList.add('container');
  searchedPlantsResult.appendChild(genusContainer);
  let genusNameHeader = document.createElement('h4');
  genusNameHeader.classList.add('headers-plant-results');
  genusNameHeader.textContent = 'Plant genus';
  genusContainer.appendChild(genusNameHeader);
  let plantGenusName = document.createElement('div');
  plantGenusName.classList.add('searched-plant-results');
  plantGenusName.textContent = genus.scientificNameWithoutAuthor;
  genusContainer.appendChild(plantGenusName);

  let moreInfoDiv = document.createElement('div');
  moreInfoDiv.classList.add('container', 'more-info');
  searchedPlantsResult.appendChild(moreInfoDiv);

  let moreInfoButton = document.createElement('button');
  moreInfoButton.classList.add('btn', 'green', 'darken-2', 'extra-button');
  moreInfoButton.textContent = 'More languages';
  moreInfoButton.addEventListener('click', () => showMoreInfo(gbif));
  moreInfoDiv.appendChild(moreInfoButton);

  let addToGardenIdentify = document.createElement('button');
  addToGardenIdentify.classList.add('btn', 'green', 'darken-2', 'extra-button');
  addToGardenIdentify.textContent = 'Add to Garden';
  addToGardenIdentify.addEventListener('click', () =>
    addPlantToGarden(plantResponse)
  );
  moreInfoDiv.appendChild(addToGardenIdentify);
  createReloadBtn(moreInfoDiv);
}

async function showMoreInfo(gbif) {
  let corsProxy = 'https://cors-anywhere.herokuapp.com/';
  try {
    if (gbif) {
      let extra = await fetch(
        corsProxy + `https://api.gbif.org/v1/species/${gbif}/vernacularNames`,
        {
          offset: 0,
          limit: 20,
        }
      );

      let extraData = await extra.json();

      let langObject = {};

      extraData.results.map((plant) => {
        for (let item in plant) {
          if (plant['language'].length > 0) {
            langObject[plant['language']] = plant['vernacularName'];
          }
        }
      });

      let languagesContainer = document.createElement('div');
      languagesContainer.classList.add('container');
      searchedPlantsResult.appendChild(languagesContainer);
      let languagesHeader = document.createElement('h4');
      languagesHeader.classList.add('headers-plant-results');
      languagesHeader.textContent = 'Comun names';
      languagesContainer.appendChild(languagesHeader);
      for (let lang in langObject) {
        let language = document.createElement('div');
        language.classList.add('searched-plant-results');
        language.textContent = `${lang}: ${langObject[lang]}`;
        languagesContainer.appendChild(language);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function addPlantToGarden(plantResponse) {
  let identifiedPhoto = '';
  const selectedPicture = searchPlantInput.files[0];
  let plantType = plantResponse.scientificNameWithoutAuthor;
  let plantName = plantResponse.commonNames[0];

  let storageRef = storage.ref('plants_pictures/' + selectedPicture.name);
  let uploadTask = storageRef.put(selectedPicture);

  uploadTask.on(
    'state_changed',
    function progress(snapshot) {},
    function error(err) {
      console.log('There has been an error: ', err);
    },
    function complete() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('From upload picture');
        db.collection('users')
          .doc(auth.currentUser.uid)
          .collection('plants')
          .add({ name: plantName, type: plantType, photoURL: downloadURL })
          .then(() => {
            window.location.href = './index.html';
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    }
  );
}

function createReloadBtn(container) {
  let reloadButton = document.createElement('button');
  reloadButton.classList.add('btn', 'green', 'darken-2', 'extra-button');
  reloadButton.textContent = 'Try again';
  reloadButton.addEventListener('click', () => window.location.reload());
  container.appendChild(reloadButton);
}
