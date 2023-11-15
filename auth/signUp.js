import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db, USERS_REF} from '../firebaseConfig'
import { Alert } from "react-native";

export const signUp = async(email, password)=> {
    try{
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
                console.log(userCredential)
            })
    }
    catch(error){
        console.log("Registration failed", error.message)
        Alert.alert("Registeröityminen ei onnistunut")
    }
}
