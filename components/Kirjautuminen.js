import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Button, Alert, SafeAreaView} from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { logIn } from '../auth/login';
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../firebaseConfig'
import { formStyles } from '../style/formStyles';


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
            if(user){
                navigation.navigate('Koti', {userUid: user.uid})
                setEmail('')
                setPassword('')
            }
        })
    }
}

  return (
    <SafeAreaView>
        <Header/>
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
    <Footer />
    </SafeAreaView>
  );
  
  };