
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHowJKeScgM08uprSPU_YO1ERW6S8KCO0",
  authDomain: "react-a-2da0a.firebaseapp.com",
  projectId: "react-a-2da0a",
  storageBucket: "react-a-2da0a.firebasestorage.app",
  messagingSenderId: "515508666645",
  appId: "1:515508666645:web:a156f79dc586605996291c",
  measurementId: "G-3HMENN63J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app