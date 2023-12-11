import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import * as Location from 'expo-location';
import MapScreen from './Pyoralla';
import config from '../digitransitConfig';
import styles from '../style/styles';
import Saa from './Saa';

export default function Position({ navigation }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);
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
  }, [navigation]);

  const handleDestinationSubmit = async () => {
    console.log('handleDestinationSubmit', destinationAddress);
    try {
      const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${config.openRouteServiceApiKey}&text=${encodeURIComponent(destinationCoords)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const { geometry } = data.features[0];
        setDestinationCoords({
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0]
        });
      } else {
        alert("Ei löytynyt koordinaatteja annetulle osoitteelle.");
      }
    } catch (error) {
      alert("Virhe haettaessa koordinaatteja: " + error);
    }
  };
  

  if (isLoading) {
    return <View style={styles.container}><Text>Retrieving location...</Text></View>;
  } else {
    return (
      <View style={styles.container}>
        <Saa latitude={latitude} longitude={longitude} />
        <TextInput
          style={styles.input}
          placeholder="Enter destination address"
          onChangeText={setDestinationAddress}
          value={destinationAddress}
        />
        <Button title="Submit" onPress={handleDestinationSubmit} />      
      </View>
    );
  }
}


