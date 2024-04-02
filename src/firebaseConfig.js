import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNUXeMpTwJ4q8Ms6hpBP6relX1PgIl2Vs",
    authDomain: "linkroadresidents.firebaseapp.com",
    databaseURL: "https://linkroadresidents-default-rtdb.firebaseio.com",
    projectId: "linkroadresidents",
    storageBucket: "linkroadresidents.appspot.com",
    messagingSenderId: "205476166783",
    appId: "1:205476166783:web:0794fd7c72676e2e82534a",
    measurementId: "G-4FG84LHTCZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, firebaseConfig };
