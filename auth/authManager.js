import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../firebaseConfig'

  //Seuraa käyttäjän tilaa. Jos käyttäjä on kirjautunut sisään, niin navigoidaan koti sivulle
  //Jos käyttää ei ole kirjautunut, niin navigoidaan aloitus sivulle. 

  const authListener = ({ navigation })=>{
    onAuthStateChanged(auth, (user) => {
  
      console.log("########## HANDLE AUTH STATE CHANGED")
      if (user) {
        // Käyttäjä on kirjautunut sisään
        console.log('#############################   Kirjautunut sisään');
        navigation.navigate('Koti', {userUid: user.uid});
      } else {
        // Käyttäjä on kirjautunut ulos
        console.log('############ Kirjautunut ulos');
        navigation.navigate('Aloitus');
      }
    })
  }

  export {auth, authListener}