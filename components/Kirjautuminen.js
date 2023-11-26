import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Button, Alert, SafeAreaView} from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { logIn } from '../auth/login';
import { formStyles } from '../style/formStyles';
import {auth, authListener} from '../auth/authManager'
import { onAuthStateChanged } from 'firebase/auth'




export default Kirjautuminen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress= async()=>{
    if (!email){
        Alert.alert('Syötä sähköposti')
    }
    else if (!password){
        Alert.alert('Syötä salasana')
    }
    else{
        await logIn(email, password)
        setEmail('')
        setPassword('')
    }
}

  return (
    <SafeAreaView>
    <View style={formStyles.container}>
      <Text style={formStyles.formText}>Kirjaudu sisään</Text>

      <TextInput style={formStyles.input}
        placeholder="Sähköposti"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput style={formStyles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={formStyles.pressable} onPress={handlePress}>
        <Text style={formStyles.pressableText}>Kirjaudu</Text>
      </Pressable>

    </View>
    </SafeAreaView>
  );
  
  };