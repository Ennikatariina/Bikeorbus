import { collection, addDoc } from "firebase/firestore"; 
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../firebaseConfig'
import { auth } from '../auth/authManager';


export default addDataToFirebase = async(address,age, weight,lowestTemperature, rain,snowing, wind, slipperyConditions) => {
try {
  // Add a new document in collection "cities"
  
await setDoc(doc(db, "users", auth.currentUser.uid ), {
    address: address,
    age: age,
    weight: weight,
    lowestTemperature: lowestTemperature,
    rain: rain,
    snowing: snowing,
    wind: wind,
    slipperyConditions: slipperyConditions,
  });
  console.log("Document written with ID: ");
} catch (e) {
  console.error("Error adding document: ", e);
}
}