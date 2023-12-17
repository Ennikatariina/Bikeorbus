import React, { useState, useEffect } from 'react';
import { Text, View} from 'react-native';
import * as Location from 'expo-location';
import styles from '../style/styles';
import Saa from './Saa';
import Tyomatkasuositus from './Tyomatkasuositus';
import Saaennuste from './saaennuste';

export default function Position() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert("Sijainnin käyttöoikeutta ei myönnetty.");
        setIsLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        if (location) {
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          alert("Sijaintitietoja ei ole saatavilla.");
        }
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <View style={styles.container}><Text>Retrieving location...</Text></View>;
  } else {
    return (
      <View >
        <View style={styles.container}>
        <Saa latitude={latitude} longitude={longitude} />  
        <Text style={styles.label}>Your location</Text>
        <Text>{latitude.toFixed(7)},{longitude.toFixed(7)}</Text>
        </View>
        
        <Saaennuste latitude={latitude} longitude={longitude}></Saaennuste>
        
        <View style={styles.container}>
          <Tyomatkasuositus latitude={latitude} longitude={longitude}></Tyomatkasuositus>
        </View>
        
      </View>
    );
  }
}


