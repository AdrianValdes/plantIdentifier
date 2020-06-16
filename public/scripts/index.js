// Getting the UI elements

const plantList = document.querySelector('.plants');
const searchedPlantsResult = document.getElementById('searched-plants-result');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const searchInput = document.getElementById('autocomplete-input');
const deleteConfirm = document.getElementById('delete-confirm');
const deleteCancel = document.getElementById('delete-cancel');

// Setting up the UI depending on the user status
const setupUI = (user) => {
  if (user) {
    //  Account info
    //setAccountDetails(user);
    db.collection('users')
      .doc(user.uid) // with the .doc method we select an specific collection with the passed id
      .get()
      .then((doc) => {
        const html = `<div> Logged in as ${
          doc.data() ? doc.data().displayName : user.displayName
        }</div><div>Your account email is: ${user.email}</div>`;
        accountDetails.innerHTML = html;
      })
      .catch((err) => {
        console.log(err);
      });

    //Changing the navbar and the Login UI
    loggedInLinks.forEach((element) => (element.style.display = 'block'));
    loggedOutLinks.forEach((element) => (element.style.display = ' none'));
    const yourGarden = document.getElementById('your-garden');
    yourGarden.style.display = 'block';
  } else {
    // Hide account info
    accountDetails.innerHTML = '';

    //Changing the navbar and the Login UI
    loggedInLinks.forEach((element) => (element.style.display = 'none'));
    const yourGarden = document.getElementById('your-garden');
    yourGarden.style.display = 'none';
    loggedOutLinks.forEach((element) => (element.style.display = 'block'));
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

  var elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems, { format: 'yyyy-mm-dd' });

  var sideNavElement = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sideNavElement);

  var selectElement = document.querySelectorAll('select');
  M.FormSelect.init(selectElement);
});
