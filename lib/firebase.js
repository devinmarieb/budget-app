import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBNljLO2sgdeo4TllRkb5gEr4vowF08iSU",
  authDomain: "budget-3f161.firebaseapp.com",
  databaseURL: "https://budget-3f161.firebaseio.com",
  storageBucket: "budget-3f161.appspot.com",
  messagingSenderId: "129838353948"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
