import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { init } from "next/dist/compiled/webpack/webpack";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiJXLorc9ZzYfMjPK5zFhOp6wFEhV06DA",
  authDomain: "recruti-9d993.firebaseapp.com",
  projectId: "recruti-9d993",
  storageBucket: "recruti-9d993.firebasestorage.app",
  messagingSenderId: "680273035144",
  appId: "1:680273035144:web:70512ba48dee0de223443d",
  measurementId: "G-XYCC3PN5DW"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig): getApp();
export const auth= getAuth(app);
export const db= getFirestore(app);