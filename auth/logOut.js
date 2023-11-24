import { signOut } from "firebase/auth";
import { Alert } from "react-native";
import {auth} from '../firebaseConfig'


export const logOut =async ()=>{
   
    await signOut(auth).then(() => {
    // Sign-out successful.
    console.log("Sign-out successful.")
    
    }).catch((error) => {
    // An error happened.
    console.log("######### error" + error.message)
    Alert.alert("Logout error", error.message)

})};