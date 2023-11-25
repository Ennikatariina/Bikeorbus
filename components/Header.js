import React from 'react'
import { Text, View, Image } from 'react-native'
import styles from '../style/styles';
import Logo from '../assets/bike-or-bus-high-resolution-logo.png';

export default function Header() {
  return (
    <View style={styles.header} >
      <Image source={Logo} style={{ width: 400, height: 200 }} 
      styles={styles.logo}/>
    </View>
  )
}