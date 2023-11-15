
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/styles';
import { signUp } from '../auth/signUp';
import {auth} from '../firebase/firebaseConfig'
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
        <>
            <View>
                <Header />

                <Text>Create Account</Text>

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

                <TextInput style={styles.input}
                    placeholder="Vahvista salasana"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <Button
                    title="Luo käyttäjä"
                    onPress={handleCreateAccount}
                />
            </View>
            <Footer />
        </>
    );
};





