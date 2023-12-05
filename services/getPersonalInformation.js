import {db} from '../firebaseConfig'
import { doc, getDoc } from "firebase/firestore";
import { auth } from '../auth/authManager';

export default getPersonalInformaiton = async() => {

const docRef = doc(db, "users", auth.currentUser.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  return docSnap.data()
  
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
  return("Tietojasi ei löytynyt tietokannasta.")
}
}