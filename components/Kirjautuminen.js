import React from 'react';
import { View, Text, Pressable } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';

export default Kirjautuminen = ({ navigation }) => {
 
    return (
      <>
      <Header />
      <View>
        <Text>Kirjautuminen Component</Text>
      </View>
      <Footer />
      </>
    );
  
  };