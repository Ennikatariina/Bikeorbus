import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import styles from '../style/styles';
import colors from '../style/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { logOut } from '../auth/logOut';
import * as geolib from 'geolib';
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../firebaseConfig'
import Position from './Paikannus';
import {Paikka} from './KayttajaPaikannus'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default Tulos = ({ navigation }) => {
  const [weatherImage, setWeatherImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const haeKoordinaatitJaKuva = async () => {
      setIsLoading(true);
      const coords = await Paikka();
      if (coords && isActive) {
        fetchLatestWeatherImage(coords);
      }else{
        console.log("Koordinaatteja ei ole saatavilla");
        setIsLoading(false);
      }
    };
    haeKoordinaatitJaKuva();
    return () => {
      setIsActive(false);
    };
  }, []);
  
  // Haetaan kelikuvan url. Tulevaisuudessa luodaan url haku funktio, joka hakee urlin sijainnnin perusteella. Presets[0] on kelikameroista paikan ensimmäinen ja se on ilmaistu oliona. 
 
  const fetchLatestWeatherImage = async (coords) => {
    if (!coords || !coords.latitude || !coords.longitude) {
      console.log('Koordinaatteja ei ole saatavilla');
      setIsLoading(false);
      return;
    }
      console.log('Fetching weather image for coordinates:', coords);
      try {
        const response = await axios.get('https://tie.digitraffic.fi/api/weathercam/v1/stations', { timeout: 10000 });
        if (response.data && response.data.features && Array.isArray(response.data.features)) {
            const userCoordinates = { latitude: coords.latitude, longitude: coords.longitude };
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
      } finally {
        setIsLoading(false);
      }
    };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }
  //LOGOUT HANDLEPRESS, tämä pitää siirtää, kun tiedetään logout napin oikea paikka
  const handlePress= async()=>{
    await logOut()   
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={{ uri: weatherImage }} style={{ width: 440, height: 200 }} />
        <Position />
        <View>
          <Pressable style={styles.pressable} onPress={() => navigation.navigate('Pyoralla')}>
            <Text style={styles.pressableText}>Pyörällä</Text>
          </Pressable>
          <Pressable style={styles.pressable} onPress={() => navigation.navigate('Bussilla')}>
            <Text style={styles.pressableText}>Bussilla</Text>
          </Pressable>
          <Pressable style={styles.pressable} onPress={handlePress}>
            <Text style={styles.pressableText}>Kirjaudu  ulos</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
