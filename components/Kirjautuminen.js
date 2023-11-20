import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Button,Alert } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/styles';
import { logIn } from '../auth/login';
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../firebaseConfig'

export default Kirjautuminen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress= ()=>{
    if (!email){
        Alert.alert('Syötä sähköposti')
    }
    else if (!password){
        Alert.alert('Syötä salasana')
    }
    else{
        logIn(email, password)
        onAuthStateChanged(auth, (user)=>{
          console.log(user.email)
            if(user){
                navigation.navigate('Koti', {userUid: user.uid})
                setEmail('')
                setPassword('')
            }
        })
    }
}

  return (
    <>
    <Header />
    <View>
      <Text>Kirjautuminen</Text>

      <TextInput style={styles.input}
        placeholder="Sähköposti"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput style={styles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Kirjaudu"
        onPress={handlePress}
       />

    </View>
    <Footer />
    </>
  );
  
  };