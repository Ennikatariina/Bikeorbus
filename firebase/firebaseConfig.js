// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsTsk9m5SL84pj3YULqgo3vIi1haKfxD0",
  authDomain: "bikeorbus-af868.firebaseapp.com",
  projectId: "bikeorbus-af868",
  storageBucket: "bikeorbus-af868.appspot.com",
  messagingSenderId: "819698560843",
  appId: "1:819698560843:web:d37ec2d6b05cc5e56a02ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
})

//Add database key for users

export const USERS_REF ='/users/'

