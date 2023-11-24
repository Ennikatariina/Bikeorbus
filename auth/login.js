import {auth} from '../firebaseConfig'
import {signInWithEmailAndPassword } from "firebase/auth";
import {Alert } from 'react-native';

export const logIn = async(email, password)=> {
    console.log(auth)
    
    try{
        await signInWithEmailAndPassword(auth,email, password)
    }
    catch(error){
        console.log("Login failed", error.message)
        Alert.alert("Kirjautuminen ei onnistunut")
    }
}