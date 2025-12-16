// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj5NwlXtcEw7aggSIQvEdjwIKYqt7umj8",
  authDomain: "nunggalrejo-db.firebaseapp.com",
  projectId: "nunggalrejo-db",
  storageBucket: "nunggalrejo-db.firebasestorage.app",
  messagingSenderId: "206361793398",
  appId: "1:206361793398:web:150193cf162ba1e8046057",
  measurementId: "G-H534GKNYKW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);