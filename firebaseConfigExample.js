// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain:"",
  projectId:"",
  storageBucket:"",
  messagingSenderId:"",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
})

//Add database key for users

export const USERS_REF ='/users/'
