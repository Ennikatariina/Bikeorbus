import { onAuthStateChanged } from 'firebase/auth'
import {auth, db} from '../firebaseConfig'

  //Seuraa käyttäjän tilaa. Jos käyttäjä on kirjautunut sisään, niin navigoidaan koti sivulle
  //Jos käyttää ei ole kirjautunut, niin navigoidaan aloitus sivulle. 

  const authListener = ({ navigation })=>{
    onAuthStateChanged(auth, (user) => {
  
      if (user) {
        // Käyttäjä on kirjautunut sisään
        console.log('#############################   Kirjautunut sisään');
        
        navigation.navigate('Koti', {userUid: user.uid});
        
        const uid = user.uid;
      }  
      else {
        // Käyttäjä on kirjautunut ulos
        console.log('############ Kirjautunut ulos');
        navigation.navigate('Aloitus');
      }
    })
  }

  export {auth, authListener}