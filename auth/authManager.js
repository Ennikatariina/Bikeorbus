import { onAuthStateChanged } from 'firebase/auth'
import {auth, db} from '../firebaseConfig'

  //Seuraa käyttäjän tilaa. Jos käyttäjä on kirjautunut sisään, niin navigoidaan koti sivulle
  //Jos käyttää ei ole kirjautunut, niin navigoidaan aloitus sivulle. 

  const authListener = ({ navigation })=>{
    onAuthStateChanged(auth, (user) => {
  
      console.log("########## HANDLE AUTH STATE CHANGED")
      if (user) {
        // Käyttäjä on kirjautunut sisään
        console.log('#############################   Kirjautunut sisään');
        navigation.navigate('Koti', {userUid: user.uid});
        const uid = user.uid;
        /* try {
          // Tarkista, onko käyttäjän dokumenttikokoelma tyhjä
          const userDoc = await db.collection('kayttajat').doc(user.uid).get();
  
          if (userDoc.exists) {
            // Käyttäjän dokumentti on olemassa
            navigation.navigate('Koti', { userUid: user.uid });
          } else {
            // Käyttäjän dokumentti ei ole olemassa, navigoi lomakesivulle
            console.log('############ Ensimmäinen kirjautuminen, navigoidaan lomakkeelle');
            navigation.navigate('lomakePerustiedot',{ userUid: user.uid } );
          }
        } catch (error) {
          console.error('Tietokantavirhe:', error);
        }*/
      }  
      else {
        // Käyttäjä on kirjautunut ulos
        console.log('############ Kirjautunut ulos');
        navigation.navigate('Aloitus');
      }
    })
  }

  export {auth, authListener}