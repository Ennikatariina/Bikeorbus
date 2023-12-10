import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';


export default function latitudeJaLongitude() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);


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
          
        } else {
          
          // Käsittele tilanne, jossa käyttäjä ei anna lupaa
          alert("Sijainnin käyttöoikeutta ei myönnetty.");
        }
      } catch (error) {
        alert(error);
        
      }
    })();
  }, []);
  const location ={latitude, longitude }
  
  return location
}