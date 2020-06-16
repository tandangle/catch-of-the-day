import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA-Q-deGCezsiSVMi604WiNgLsPTlM8ekY",
    authDomain: "catch-of-the-day-fe90b.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-fe90b.firebaseio.com"
  });

const base = Rebase.createClass(firebaseApp.database())


//This is a named export

export { firebaseApp };

// This is a default export

export default base;