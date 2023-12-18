import {deleteUser as authDeleteUser, reauthenticateWithCredential, EmailAuthProvider  } from "firebase/auth";
import { auth} from './authManager';
import {db} from '../firebaseConfig'
import { deleteDoc, collection, query, where, getDocs, doc } from "firebase/firestore";


export default deleteUser = async ({ navigation, userConfirmed }) => {
    const user = auth.currentUser;
    try {
      // Pyydä käyttäjää kirjautumaan sisään uudelleen
      const credentials = EmailAuthProvider.credential(user.email, userConfirmed);
      await reauthenticateWithCredential(user, credentials);

      await authDeleteUser(user);
      console.log('User deleted successfully.');
  
      await deleteDoc(doc(db, "users", user.uid));

      navigation.navigate('Aloitus');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };