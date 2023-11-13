
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Aloitus = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('LuoKayttaja');
  };

  return (
    <View>
      <Text>Welcome to Bikeorbus!</Text>
      <Button title="Create an account" onPress={() => navigation.navigate('LuoKayttaja')} />
      <Button title="Log in" onPress={() => navigation.navigate('Kirjautuminen')} />
    </View>
  );
};

export default Aloitus;
