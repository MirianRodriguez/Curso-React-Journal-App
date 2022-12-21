// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtWh9GQXcNYIShShhzc898c_mdQz7p3xM",
  authDomain: "journal-134f7.firebaseapp.com",
  projectId: "journal-134f7",
  storageBucket: "journal-134f7.appspot.com",
  messagingSenderId: "557955134546",
  appId: "1:557955134546:web:d19aea545e7946ce9cdb8b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp); //funcionalidades para la autenticación de usuarios
export const FirebaseDB = getFirestore (FirebaseApp);//configuraciones y utilidades de base de datos