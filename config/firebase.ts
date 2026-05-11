// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeIIlVOHTc-E99eO9w4k3n8PqFUVeF8UQ",
  authDomain: "work-pulse1.firebaseapp.com",
  projectId: "work-pulse1",
  storageBucket: "work-pulse1.firebasestorage.app",
  messagingSenderId: "906597006921",
  appId: "1:906597006921:web:6c6269bf4c9f1315da4998"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);