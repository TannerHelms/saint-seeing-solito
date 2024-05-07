// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkwgam2TfcnYuErdzTvWMRptj2rI9U4J0",
    authDomain: "saint-seeing-5d426.firebaseapp.com",
    projectId: "saint-seeing-5d426",
    storageBucket: "saint-seeing-5d426.appspot.com",
    messagingSenderId: "1012597148133",
    appId: "1:1012597148133:web:d1ab6d32809140cc75870c",
    measurementId: "G-0G9XHJEH6X"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage();

export { app, db, storage, auth }