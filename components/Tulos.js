
import React, { useState, useEffect } from 'react';

import { View, Text, Pressable, Image, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { logOut } from '../auth/logOut';
import * as geolib from 'geolib';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default Tulos = ({ navigation }) => {
  const [weatherImage, setWeatherImage] = useState(null);




  // Haetaan kelikuvan url. Tulevaisuudessa luodaan url haku funktio, joka hakee urlin sijainnnin perusteella. Presets[0] on kelikameroista paikan ensimmäinen ja se on ilmaistu oliona. 
  useEffect(() => {
    const fetchLatestWeatherImage = async () => {
      try {
        const response = await axios.get('https://tie.digitraffic.fi/api/weathercam/v1/stations');

        if (response.data && response.data.features && Array.isArray(response.data.features)) {
          const userCoordinates = { latitude: 64.959079, longitude: 25.517196 };
          let nearestStation = null;
          let minDistance = Infinity;

          response.data.features.forEach(station => {
            const coordinates = station.geometry.coordinates.slice(0, 2);
            const distance = geolib.getDistance(userCoordinates, { latitude: coordinates[1], longitude: coordinates[0] });

            if (distance < minDistance) {
              minDistance = distance;
              nearestStation = station;
            }
          });
          if (nearestStation) {
            const response2 = await axios.get(`https://tie.digitraffic.fi/api/weathercam/v1/stations/${nearestStation.properties.id}`);
            const imageUrl = response2.data.properties.presets[0].imageUrl;
            console.log('Matching Image URL: ', imageUrl);
            if (imageUrl) {
              setWeatherImage(imageUrl);
            } else {
              console.log('No matching image URL found');
            }
          } else {
            console.log('No matching station found');
          }
        } else {
          console.log('Invalid or unexpected API response structure');
        }
      } catch (error) {
        console.error('Error fetching weather image: ', error);
      }
    };
    fetchLatestWeatherImage();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
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
        <Pressable style={styles.pressable} onPress={logOut}>
          <Text style={styles.pressableText}>Kirjaudu  ulos</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
