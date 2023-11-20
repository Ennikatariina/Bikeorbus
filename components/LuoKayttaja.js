
import React, { useState } from 'react';
import { View, Text, TextInput,Alert, Pressable } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { formStyles } from '../style/formStyles';
import { signUp } from '../auth/signUp';
import {auth} from '../firebaseConfig'
import { onAuthStateChanged } from '@firebase/auth';

export default LuoKayttaja = ({ navigation, }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCreateAccount = () => {
        if (!email){
            Alert.alert("Syötä sähköposti")
        }
        else if (!password){
            Alert.alert("Syötä salasana")
        }
        else if (!confirmPassword){
            setPassword('')
            Alert.alert("Syötä salasana uudestaan")
        }
        else if (password !== confirmPassword){
            Alert.alert("Salasanat eivät täsmää")
        }
        else{
            signUp(email, password)
            onAuthStateChanged(auth, (user)=>{
                if (user){
                    navigation.navigate('Koti', {userUid:user.uid});
                }
            })
        }
        console.log('handleCreateAccount', email, password, confirmPassword); 
    };

    return (
        <View >
            <Header />
            <View style={formStyles.container}>
                <Text style={formStyles.formText}>Luo käyttäjä</Text>

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

                <TextInput style={formStyles.input}
                    placeholder="Vahvista salasana"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <Pressable style={formStyles.pressable} onPress={handleCreateAccount}>
                    <Text style={formStyles.pressableText}>Luo käyttäjä</Text>
                </Pressable>
               
            </View>
            <Footer />
        </View>
);
};





