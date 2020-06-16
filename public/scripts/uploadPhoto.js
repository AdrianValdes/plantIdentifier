function uploadPhoto(e) {
  // Get the file

  let file = e.target.files[0];

  //Create a storage ref
  let storageRef = storage.ref('plants_pictures/' + file.name);
  //Upload file
  let uploadTask = storageRef.put(file);

  // Listen for state changes, errors, and completion of the upload.
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      function progress(snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },
      function error(err) {
        console.log('There has been an error: ', err);
      },
      function complete() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          resolve(downloadURL);
        });
      }
    );
  });
}
