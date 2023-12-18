import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebaseConfig'
import { Alert } from "react-native";

export const signUp = async(email, password,setModalVisible)=> {
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        setModalVisible(true)
        
    }
    catch(error){
        console.log("Registration failed", error.message)
        Alert.alert("Rekisteröityminen ei onnistunut")
    }
}
