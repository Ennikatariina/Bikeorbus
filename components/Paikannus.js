import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import Saa from './Saa';
import styles from '../style/styles';
import Tyomatkasuositus from './Tyomatkasuositus';


export default function Position() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status === 'granted') {
          const location = await Location.getLastKnownPositionAsync({ accuracy: 6 });
          if (location) {
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
          } else {
            // Käsittele tilanne, jossa sijaintitietoja ei ole saatavilla
            alert("Sijaintitietoja ei ole saatavilla.");
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          // Käsittele tilanne, jossa käyttäjä ei anna lupaa
          alert("Sijainnin käyttöoikeutta ei myönnetty.");
        }
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
      
    })();
  }, []);

  


  if (isLoading) {
    return <View style={styles.container}><Text>Retrieving location...</Text></View>
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Your location</Text>
        <Text>{latitude.toFixed(7)},{longitude.toFixed(7)}</Text>
        <Saa latitude={latitude} longitude={longitude} />
        <Tyomatkasuositus latitude={latitude} longitude={longitude}></Tyomatkasuositus>
      </View>
    )
  }
}
