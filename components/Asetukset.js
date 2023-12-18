import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../style/styles';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { logOut } from '../auth/logOut';

const Asetukset = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logOut();
    navigation.navigate('Kirjautuminen');
  };

  return (
    <>
      <View style={styles.centered}>
      <Pressable style={styles.pressable} onPress={() => navigation.navigate('MuutaTietoja')}>
        <Text style={styles.pressableText}>Muuta tietojasi</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={handleLogout}>
        <Text style={styles.pressableText}>Kirjaudu ulos</Text>
      </Pressable>
      </View>
    </>
  );
};

export default Asetukset;