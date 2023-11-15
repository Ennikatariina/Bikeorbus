import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebaseConfig'
import { Alert } from "react-native";

export const signUp = async(email, password)=> {
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredentials)
        
    }
    catch(error){
        console.log("Registration failed", error.message)
        Alert.alert("Rekisteröityminen ei onnistunut")
    }
}
