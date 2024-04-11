// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe1awLgiQzR_DLWRDrmz7PYvzWMYmaVSY",
  authDomain: "reactjs-firebase-course.firebaseapp.com",
  projectId: "reactjs-firebase-course",
  storageBucket: "reactjs-firebase-course.appspot.com",
  messagingSenderId: "306133183134",
  appId: "1:306133183134:web:b4e433f2bb65ae2e21698f",
  measurementId: "G-HZBD5BMVN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
