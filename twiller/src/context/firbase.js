// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA19MdMtBiYxRjZhB_wdIJ15CYUnMNEoX4",
  authDomain: "twiller-b6184.firebaseapp.com",
  projectId: "twiller-b6184",
  storageBucket: "twiller-b6184.appspot.com",
  messagingSenderId: "324538119080",
  appId: "1:324538119080:web:3271bd863c3dd4cb26e39d",
  measurementId: "G-V5VS0WR6HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export default app
//const analytics = getAnlytics(app);