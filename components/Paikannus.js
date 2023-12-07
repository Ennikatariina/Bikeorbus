import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import Saa from './Saa';
import MapScreen from './Pyoralla';
import styles from '../style/styles';


export default function Position() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
          if (location) {
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
          } else {
            alert("Sijaintitietoja ei ole saatavilla.");
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
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
	      <Saa latitude={latitude} longitude={longitude} />
        <MapScreen latitude={latitude} longitude={longitude} />
      </View>
    )
  }
}
