
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/styles';

export default LuoKayttaja = ({ navigation, }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCreateAccount = () => {
        console.log('handleCreateAccount', email, password, confirmPassword); 
        navigation.navigate('Koti');

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





