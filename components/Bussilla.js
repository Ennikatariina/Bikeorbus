import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/styles';

export default function Bussilla() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Bussilla
            </Text>
        </View>
    );
}