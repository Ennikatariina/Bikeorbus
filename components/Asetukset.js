import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MuutaTietoja from './MuutaTietoja';
import styles from '../style/styles';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import deleteUser from '../auth/deleteUser';
 
import { Alert } from 'react-native';
import { logOut } from '../auth/logOut';



export default Asetukset = ({ navigation }) => {

  const handleLogout = async () => {
   
      await logOut()
      navigation.navigate('Kirjautuminen')
      
  
  };

  const handleDeleteUser= async()=>{
      try {
        const userConfirmed = await new Promise((resolve) => {
          Alert.prompt(
            'Haluatko varmasti poistaa tilisi',
            'Syötä salasana varmuudeksi',
            (password) => resolve(password),
            'secure-text'  // Tämä asettaa tekstikentän turvalliseksi, joten syötetty teksti näkyy tähdinä
          );
        });
    
        if (userConfirmed !== null) {
          // Käyttäjä syötti salasanansa, voit nyt välittää sen deleteUser-funktiolle
          deleteUser({ navigation,userConfirmed});
          navigation.navigate('Aloitus')
        }
      }
      catch (error) {
      console.error('Tilin poistaminen epäonnistui:', error.message);
      Alert.alert('Tilin poistaminen epäonnistui:')
    }
  }


  return (
     <>
      <Header />
      
        <Text style={styles.etusivuText}
      >Asetukset</Text>
      <Pressable style={styles.pressable}
        onPress={() => navigation.navigate('MuutaTietoja')}>
        <Text style={styles.pressableText}>Muuta tietojasi</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={handleLogout}>
        <Text style={styles.pressableText}>Kirjaudu ulos</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={handleDeleteUser}>
        <Text style={styles.pressableText}>Poista käyttäjätilisi</Text>
      </Pressable>
      <Footer />
    </>
  );

};