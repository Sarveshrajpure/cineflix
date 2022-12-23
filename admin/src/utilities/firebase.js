// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxbXgdYa-cz-aTIiS7m0o38v5Gjz6wkG8",
  authDomain: "cineflix-be0cd.firebaseapp.com",
  projectId: "cineflix-be0cd",
  storageBucket: "cineflix-be0cd.appspot.com",
  messagingSenderId: "229881728121",
  appId: "1:229881728121:web:e8a393ffa4fb796103d8a8",
  measurementId: "G-Z44HSKGV5R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
