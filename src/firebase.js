// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt6q1zHrhElB3h3MeIgJSU_A99dYSxqTA",
  authDomain: "graphical-tape-461512-s2.firebaseapp.com",
  projectId: "graphical-tape-461512-s2",
  storageBucket: "graphical-tape-461512-s2.firebasestorage.app",
  messagingSenderId: "340005532348",
  appId: "1:340005532348:web:bce57242bfe7d95dd6d6b9",
  measurementId: "G-HD0KWRS43L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
