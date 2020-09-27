import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {};

// Initialize Firebase
const firebaseapp = firebase.initializeApp(firebaseConfig);

export default firebaseapp;
