/*******SET THE UI DEPENDING ON THE USER STATUS *******/

// Listening for auth status changes
auth.onAuthStateChanged((user) => {
  // checking if there is an user logged in

  if (user) {
    // get data from collection plants in the database by using onSnapshot
    // instead of get().then, sets up a listener to the database. onSnapshot takes
    // a second parameter that allows to handle the error.
    db.collection('users')
      .doc(auth.currentUser.uid)
      .collection('plants')
      .onSnapshot(
        (querySnapshot) => {
          setupPlants(querySnapshot.docs, user);
          setupUI(user);
        },
        (err) => console.log(err.message)
      );
  } else {
    setupUI();

    setupPlants([]);
  }
});
