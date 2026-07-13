// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multiagentai-50fb6.firebaseapp.com",
  projectId: "multiagentai-50fb6",
  storageBucket: "multiagentai-50fb6.firebasestorage.app",
  messagingSenderId: "527150967718",
  appId: "1:527150967718:web:e4545cc32c6db61876fd67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
