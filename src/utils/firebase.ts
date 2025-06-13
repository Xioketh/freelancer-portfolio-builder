// src/utils/firebase.ts
import {getApp, getApps, initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAXdhpMtHXDX1YvJkI73o5QVr3mk-CgME4",
    authDomain: "freelancer-portfolio-75abd.firebaseapp.com",
    projectId: "freelancer-portfolio-75abd",
    storageBucket: "freelancer-portfolio-75abd.firebasestorage.app",
    messagingSenderId: "274985156871",
    appId: "1:274985156871:web:2926758889697da7ec85a2",
    measurementId: "G-D8HDLV0C5J"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
