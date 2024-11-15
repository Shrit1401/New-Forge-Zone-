// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmd2rtZ8U1BH4zGVM-t4-ux8gVi-duOsI",
  authDomain: "forge-zone.firebaseapp.com",
  projectId: "forge-zone",
  storageBucket: "forge-zone.firebasestorage.app",
  messagingSenderId: "1040019059839",
  appId: "1:1040019059839:web:433038ec06ec1de5df7b4a",
  measurementId: "G-6SYFHT7B2C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
