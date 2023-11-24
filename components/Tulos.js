
import React, { useState, useEffect } from 'react';

import { View, Text, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import { logOut } from '../auth/logOut';
import * as geolib from 'geolib';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
let lahinkamera = null;
let latlonkoordinaatit = [];
export default Tulos = ({ navigation }) => {
  const [weatherImage, setWeatherImage] = useState(null);

  


  // Haetaan kelikuvan url. Tulevaisuudessa luodaan url haku funktio, joka hakee urlin sijainnnin perusteella. Presets[0] on kelikameroista paikan ensimmäinen ja se on ilmaistu oliona. 
  useEffect(() => {
    const fetchLatestWeatherImage = async () => {
      try {
        const response = await axios.get('https://tie.digitraffic.fi/api/weathercam/v1/stations');
        
        if (response.data && response.data.features && Array.isArray(response.data.features)) {
          let latlonkoordinaatit = [];
          response.data.features.forEach(station => {
            const coordinates = station.geometry.coordinates.slice(0, 2);
            latlonkoordinaatit.push({ coordinates, stationId: station.id });
          });
          
          const nearestStation = geolib.findNearest({ latitude: 67.01236, longitude: 10.46816 }, latlonkoordinaatit);
          console.log('Nearest Station ID: ', nearestStation.stationId); // Change nearestStation.key to nearestStation.stationId
        
          const matchingStation = response.data.features.find(station => station.properties.id === nearestStation.stationId);
          const response2 = await axios.get('https://tie.digitraffic.fi/api/weathercam/v1/stations/' + matchingStation.properties.id );

          console.log('Matching Station: ', matchingStation);
          const stationId = matchingStation.properties.id;
          if (matchingStation) {
            console.log('Matching Station: ', matchingStation); // Log the entire matching station object
            const presets = matchingStation.properties.presets;
            console.log('Presets: ', presets);
            
            const imageUrl = response2.data.properties.presets[0].imageUrl;
            console.log('Matching Image URL: ', imageUrl);
          
            if (imageUrl) {
              // Further processing or rendering based on the obtained imageUrl
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
 