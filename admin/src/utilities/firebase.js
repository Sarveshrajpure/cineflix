// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS2w_lWiqyKP-Itn9qynb6dV2VL4QeLLk",
  authDomain: "cine-flix2.firebaseapp.com",
  projectId: "cine-flix2",
  storageBucket: "cine-flix2.appspot.com",
  messagingSenderId: "152198607440",
  appId: "1:152198607440:web:2dcf74f36208cd358b9755",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
