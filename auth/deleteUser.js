import {deleteUser as authDeleteUser, reauthenticateWithCredential, EmailAuthProvider  } from "firebase/auth";
import {auth} from '../firebaseConfig'


const deleteUser = async ({ navigation, userConfirmed }) => {
    const user = auth.currentUser;
    try {
      // Pyydä käyttäjää kirjautumaan sisään uudelleen
      const credentials = EmailAuthProvider.credential(user.email, userConfirmed);
      await reauthenticateWithCredential(user, credentials);

      await authDeleteUser(user);
      console.log('User deleted successfully.');


    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  export default deleteUser;