// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCCBooXhK-WRsHFoiewJwk4nzQHfmcJc4Q",
  authDomain: "brocode-ca371.firebaseapp.com",
  projectId: "brocode-ca371",
  storageBucket: "brocode-ca371.firebasestorage.app",
  messagingSenderId: "622758120429",
  appId: "1:622758120429:web:39587b8bd2a222ad4e75e4",
  measurementId: "G-PQBK7W8XF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };
