import { collection, addDoc } from "firebase/firestore"; 
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../firebaseConfig'


export default addDataToFirebase = async() => {
try {
  // Add a new document in collection "cities"
await setDoc(doc(db, "cities", "LAA"), {
    name: "Lrefeffef",
    state: "CAfef",
    country: "USAeferf"
  });
  console.log("Document written with ID: ");
} catch (e) {
  console.error("Error adding document: ", e);
}
}