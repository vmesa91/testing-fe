// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa7S1ylxPtxaRv6CaHPmQ26sgGOv_Izic",
  authDomain: "react-app-journal-9f278.firebaseapp.com",
  projectId: "react-app-journal-9f278",
  storageBucket: "react-app-journal-9f278.appspot.com",
  messagingSenderId: "173603502677",
  appId: "1:173603502677:web:1e1ea9744cc54fca43f2dc"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );