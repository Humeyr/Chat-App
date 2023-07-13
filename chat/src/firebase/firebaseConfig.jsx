// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBOMX6BU4Gp59OTmAWm-aTMUYQ9MJS0vE",
  authDomain: "chat-96d06.firebaseapp.com",
  projectId: "chat-96d06",
  storageBucket: "chat-96d06.appspot.com",
  messagingSenderId: "616031306235",
  appId: "1:616031306235:web:6314d24c735d4000378b5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);