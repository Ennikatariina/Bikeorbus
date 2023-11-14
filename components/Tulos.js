import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/styles';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


//Ei vielä vie mihinkään näppäimet
export default Tulos = ({ navigation }) => {
  return (
   <View>
      <Header />
     <Text>Keli kuva</Text>
     <Text>Säätiedot</Text>
     <Text>Yhteenveto</Text>

     
     <Pressable style={styles.pressable}
     onPress={() => navigation.navigate('Pyoralla')}>
        <Text style={styles.pressableText}
        >Pyörällä</Text>
      </Pressable>
      <Pressable style={styles.pressable}
       onPress={() => navigation.navigate('Bussilla')}>
        <Text style={styles.pressableText}
        >Bussilla</Text>
      </Pressable>
    </View>
  );
};

 