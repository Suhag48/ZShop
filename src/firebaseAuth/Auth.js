// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABqyEYlcb0x8w5xa-0YUmD164P4qSULoo",
  authDomain: "zshop-9846a.firebaseapp.com",
  projectId: "zshop-9846a",
  storageBucket: "zshop-9846a.firebasestorage.app",
  messagingSenderId: "479336580662",
  appId: "1:479336580662:web:c93787ac2a9493eb627a97",
  measurementId: "G-QEQWJ5ZXH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export {app, auth, db, analytics}
