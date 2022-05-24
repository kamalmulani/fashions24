// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIh__kMphAbCEMz3uMaJvSZloRy6wiNKM",
  authDomain: "eng22-78842.firebaseapp.com",
  projectId: "eng22-78842",
  storageBucket: "eng22-78842.appspot.com",
  messagingSenderId: "211979664923",
  appId: "1:211979664923:web:e8a65c849e57913dddc2be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const db = getFirestore(app);
