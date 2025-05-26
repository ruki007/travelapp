// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQIRh5BzPS5jOACbh_o1a9-yzVPBdqTSw",
  authDomain: "travelapp-74ce7.firebaseapp.com",
  projectId: "travelapp-74ce7",
  storageBucket: "travelapp-74ce7.firebasestorage.app",
  messagingSenderId: "224114033435",
  appId: "1:224114033435:web:d103789af06e13620689be",
  measurementId: "G-M8LVPS5G7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;