// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUXXCNmm_-Ncck5V6_QnlFxamI6Hqo1Yo",
  authDomain: "recordatorios-app-cathy.firebaseapp.com",
  databaseURL:
    "https://recordatorios-app-cathy-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recordatorios-app-cathy",
  storageBucket: "recordatorios-app-cathy.appspot.com",
  messagingSenderId: "665624685235",
  appId: "1:665624685235:web:ac29399baa48ac0c0a1ec6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar data base
export const db = getDatabase(app);
export const listasEnDB = ref(db, "listas");

// Inicializar Storage
export const storage = getStorage(app);
