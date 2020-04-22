import * as firebase from 'firebase';
const config = {
   apiKey: "AIzaSyANt8ZUZ7qn1Ti4p239VPiycXC8qoLFf_o",
   authDomain: "easy-card-dev.firebaseapp.com",
   databaseURL: "https://easy-card-dev.firebaseio.com",
   projectId: "easy-card-dev",
   storageBucket: "easy-card-dev.appspot.com",
   messagingSenderId: "865099544652",
   appId: "1:865099544652:web:09cac20664e84dbc",
   roleUrl: "https://us-central1-easy-card-dev.cloudfunctions.net/getRole",
};
 firebase.initializeApp(config)

export default firebase;

