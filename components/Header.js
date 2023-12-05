import React from 'react'
import { Text, View, Image, SafeAreaView } from 'react-native'
import styles from '../style/styles';
import Logo from '../assets/bike-or-bus-high-resolution-logo.png';

export default function Header() {
  return (
    
    <View style={styles.header} >
      <Image style={styles.logo} source={Logo} />
    </View>
    
  )
}