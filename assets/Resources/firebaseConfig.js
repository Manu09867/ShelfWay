// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAGcRkfoXHr6f6TsQa7gsLNHfjaYIpozRo",
    authDomain: "shelfway-d35dd.firebaseapp.com",
    projectId: "shelfway-d35dd",
    storageBucket: "shelfway-d35dd.firebasestorage.app",
    messagingSenderId: "889773649780",
    appId: "1:889773649780:web:e17857c9fa102f1bdfc621",
    measurementId: "G-M7YYSZ4C1E"
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa servicios que vas a usar
export const auth = getAuth(app);    // <-- exporta auth
export const db = getFirestore(app); // <-- exporta firestore
