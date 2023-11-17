
import React, { useState, useEffect } from 'react';

import { View, Text, Pressable, Image} from 'react-native';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default Tulos = ({ navigation }) => {
  const [weatherImage, setWeatherImage] = useState(null);



  // Haetaan kelikuvan url. Tulevaisuudessa luodaan url haku funktio, joka hakee urlin sijainnnin perusteella. Presets[0] on kelikameroista paikan ensimmäinen ja se on ilmaistu oliona. 
  useEffect(() => {
    const fetchLatestWeatherImage = async () => {
      try {
        const response = await axios.get('https://tie.digitraffic.fi/api/weathercam/v1/stations/C12614');
        const imageUrl = response.data.properties.presets[0].imageUrl;
        if (response.data.properties.presets[0].imageUrl) {
          setWeatherImage(response.data.properties.presets[0].imageUrl);
          console.log('Viimeisin kelikuva: ', imageUrl);
        } else {
          console.log('Kelikuvaa ei saatavilla');
        }
      } catch (error) {
        console.error('Virhe haettaessa kelikuvaa: ', error);
      }
    };

    fetchLatestWeatherImage();
  }, []); 

  return (
    <View>
      <Header />
      <Text>Keli kuva</Text>
      <Text>Säätiedot</Text>
      <Text>Yhteenveto</Text>
      <Image source={{ uri: weatherImage }} style={{ width: 200, height: 200 }} />
      
      <Pressable style={styles.pressable} onPress={() => navigation.navigate('Pyoralla')}>
        <Text style={styles.pressableText}>Pyörällä</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => navigation.navigate('Bussilla')}>
        <Text style={styles.pressableText}>Bussilla</Text>
      </Pressable>
    </View>
  );
};
 