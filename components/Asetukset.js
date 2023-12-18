import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../style/styles';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { logOut } from '../auth/logOut';
import  deleteUser  from '../auth/deleteUser';

const Asetukset = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logOut();
    navigation.navigate('Kirjautuminen');
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
        await deleteUser({ navigation, userConfirmed });
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
      <View style={styles.centered}>
      <Pressable style={styles.pressable} onPress={() => navigation.navigate('MuutaTietoja')}>
        <Text style={styles.pressableText}>Muuta tietojasi</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={handleLogout}>
        <Text style={styles.pressableText}>Kirjaudu ulos</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={handleDeleteUser}>
        <Text style={styles.pressableText}>Poista käyttäjätilisi</Text>
      </Pressable>
      </View>
    </>
  );
};

export default Asetukset;