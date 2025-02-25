import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importamos Auth

const firebaseConfig = {
    apiKey: "AIzaSyCGRWPNSxUBGITZiFYrdzqK4rPPFur2HRk",
    authDomain: "pacientesvm-97d23.firebaseapp.com",
    projectId: "pacientesvm-97d23",
    storageBucket: "pacientesvm-97d23.firebasestorage.app",
    messagingSenderId: "389415493356",
    appId: "1:389415493356:web:b8a1efb91ce68e589ecfc9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Exportamos auth

export default app;










