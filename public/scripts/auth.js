// Singup process
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get user information
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  const firstName = signupForm['first-name'].value;
  const lastName = signupForm['last-name'].value;
  const displayName = `${firstName} ${lastName}`;
  try {
    const credentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await db
      .collection('users') // Event if users doesn't exist the first time it is auto-created
      .doc(credentials.user.uid) // .doc creates a document with the passed id as an argument
      .set({ displayName: displayName }); // .set defines the object inside the users coll

    // Closing the modal with materialize
    const modal = document.getElementById('modal-signup');
    M.Modal.getInstance(modal).close();
    // Cleaning the form fields
    signupForm.reset();
    document.getElementById('error-signup').innerHTML = '';
  } catch (err) {
    console.log(err.message);
    document.getElementById('error-signup').innerHTML = err.message;
  }
});

// SIGIN WITH GOOGLE
const signinGoogle = document.getElementById('signin-google');

signinGoogle.addEventListener('click', (e) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      const modal = document.getElementById('modal-signup');
      M.Modal.getInstance(modal).close();
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(error);
    });
});

// Logout the user
const logout = document.querySelectorAll('.logout-link');
logout.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
});

// Login an exisiting user
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get user information
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  //Login in the user
  auth
    .signInWithEmailAndPassword(email, password)
    .then((credentials) => {
      // Closing the modal with materialize
      const modal = document.getElementById('modal-login');
      M.Modal.getInstance(modal).close();

      // Cleaning the form fields
      loginForm.reset();
      document.getElementById('error-login').innerHTML = '';
    })
    .catch((err) => {
      console.log(err.message);
      document.getElementById('error-login').innerHTML = err.message;
    });
});
