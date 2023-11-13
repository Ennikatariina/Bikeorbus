
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import styles from '../style/styles';

const Aloitus = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Header />
      <Text style={styles.etusivuText}
      >Tervetuloa Bikeorbus sovellukseen!</Text>
      <Button title="Create an account" onPress={() => navigation.navigate('LuoKayttaja')} />
      <Button title="Log in" onPress={() => navigation.navigate('Kirjautuminen')} />
    </View>
  );
};

export default Aloitus;
