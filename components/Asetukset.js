import React from 'react';
import { Text } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MuutaTietoja from './MuutaTietoja';
import styles from '../style/styles';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { logOut } from '../auth/logOut';

export default Asetukset = ({ navigation }) => {

  const handleLogout = async () => {
   
      await logOut()
      navigation.navigate('Kirjautuminen')
  };

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
      <Footer />
    </>
  );
};