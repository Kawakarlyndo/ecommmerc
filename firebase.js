import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGHYT4oC-GVKaFW_6RBHy1zrgd5wihDcM",
  authDomain: "portfolio-91d7b.firebaseapp.com",
  databaseURL: "https://portfolio-91d7b-default-rtdb.firebaseio.com",
  projectId: "portfolio-91d7b",
  storageBucket: "portfolio-91d7b.firebasestorage.app",
  messagingSenderId: "6133951328",
  appId: "1:6133951328:web:4f5efca1c3deb2ddf50c05",
  measurementId: "G-FMYLX10FDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;

