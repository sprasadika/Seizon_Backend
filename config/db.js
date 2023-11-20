const firebase = require('firebase');
// const config = require('./config');

const firebaseConfig = {
    apiKey: "AIzaSyD-vMTV6aYNsJD7eQH7AEQMV2TlNOk19Jc",
    authDomain: "seizon-app.firebaseapp.com",
    projectId: "seizon-app",
    storageBucket: "seizon-app.appspot.com",
    messagingSenderId: "900874151540",
    appId: "1:900874151540:web:97dcda280997e103929321",
    measurementId: "G-378H7PP3HY"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = db;