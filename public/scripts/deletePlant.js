/***********DELETING PLANTS************ */

const deletePlant = (plantId) => {
  db.collection('users')
    .doc(auth.currentUser.uid)
    .collection('plants')
    .doc(plantId)
    .delete()
    .then(() => {})
    .catch((err) => {
      console.log('Error removing the document', err);
    });
};
