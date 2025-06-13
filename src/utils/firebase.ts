// src/utils/firebase.ts
import {getApp, getApps, initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyAXdhpMtHXDX1YvJkI73o5QVr3mk-CgME4",
//     authDomain: "freelancer-portfolio-75abd.firebaseapp.com",
//     projectId: "freelancer-portfolio-75abd",
//     storageBucket: "freelancer-portfolio-75abd.firebasestorage.app",
//     messagingSenderId: "274985156871",
//     appId: "1:274985156871:web:2926758889697da7ec85a2",
//     measurementId: "G-D8HDLV0C5J"
// };

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
