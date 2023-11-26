import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import styles from '../style/styles';
import { Pressable } from 'react-native';
import Kirjautuminen from './Kirjautuminen';
import { authListener } from '../auth/authManager';
export default Aloitus = ({ navigation }) => {

  // Seuraa käyttäjän tilaa (onko kirjautuneena vai ei)
  authListener({ navigation })
  
  // Ekaan sivuun ei välttämättä tarvitse navbaria? Laitetaanko vasta kun kirjaudutaan?
  return (
    <View style={styles.aloitus}>
      <Header />
      <Text style={styles.etusivuText}
      >Tervetuloa Bikeorbus sovellukseen!</Text>
      <Pressable style={styles.pressable}
        onPress={() => navigation.navigate('LuoKayttaja')}>
        <Text style={styles.pressableText}>Luo käyttäjä</Text>
      </Pressable>

      
      <Pressable style={styles.pressable}
        onPress={() => navigation.navigate('Kirjautuminen')}>
        <Text style={styles.pressableText}>Kirjaudu</Text>
      </Pressable>

    </View>
  );
};
