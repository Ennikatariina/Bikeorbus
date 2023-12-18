import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { fetchStopIdByNameOrNumber } from '../Api';
import { fetchStopsByRadius } from '../Api';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { apiKey } from '../digitransitConfig.js';
import * as Location from 'expo-location';
import styles from '../style/styles';

function Bussilla({ navigation }) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState(null);
  const [nearbyStops, setNearbyStops] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);

  // User location and permissions
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Lupa hylätty', 'Sovellus tarvitsee luvan sijainnin käyttöön!');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      })();
      return () => { };
    }, [])
  );

  const handleDestinationSubmit = async () => {
    if (!destinationAddress) {
      alert("Destination address is required");
      return;
    }
    const digitransitGeocodingUrl = `https://api.digitransit.fi/geocoding/v1/search?text=${encodeURIComponent(destinationAddress)}&size=1`;

    try {
      const response = await fetch(digitransitGeocodingUrl, {
        headers: {
          'Content-Type': 'application/json',
          'digitransit-subscription-key': apiKey
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const location = data.features[0].geometry.coordinates;
        setDestinationCoords({
          latitude: location[1],
          longitude: location[0]
        });
        if (mapRef.current && userLocation && destinationCoords) {
          const region = calculateRegion(userLocation, destinationCoords);
          mapRef.current.animateToRegion(region, 1000); // 1000 ms animaation kesto
        }
      
      } else {
        alert("Ei löytynyt koordinaatteja annetulle osoitteelle.");
      }
    } catch (error) {
      alert("Virhe haettaessa koordinaatteja: " + error);
    }
  };

  // Initial stop-id fetch by using name or number of the stop
  const handleSearch = async () => {
    try {
      const { latitude, longitude } = await handleDestinationSubmit(query);
      const stops = await fetchStopIdByNameOrNumber(query);
      if (stops.length > 0) {
        const nearestStop = stops[0];
        navigation.navigate('Bussit', { stopId: stops[0].gtfsId });
      } else {
        Alert.alert('Virhe', 'Pysäkkiä ei löydetty, yritä uudella numerolla!');
      }
    } catch (error) {
      console.error("Error fetching stops:", error);
      Alert.alert('Virhe', 'Pysäkkitietojen haku epäonnistui!');
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    try {
      // Query nearby bus stops using Digitransit API
      const stops = await fetchStopsByRadius(latitude, longitude, 30);
      if (stops.length > 0) {
        // Assuming you want to navigate to the first stop in the list
        navigation.navigate('Bussit', { stopId: stops[0].gtfsId });
        //setNearbyStops(stops);
      } else {
        Alert.alert('Pysäkkiä ei löydetty', 'Ei pysäkkejä tällä alueella, tai tarkkuus ei ollut riittävä!');
      }
    } catch (error) {
      console.error('Error fetching stops:', error);
      Alert.alert('Virhe', 'Kohteen pysäkkien haku epäonnistui!');
    }
  };
  
  const handleBackToKoti = () => {
    navigation.navigate('Koti');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ position: 'absolute', top: 50, left: 20}}>
          <Button title="Takaisin" onPress={handleBackToKoti} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input2}
          placeholder="Syötä pysäkin numero (esim. 11)"
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.buttonContainer2}>
          <Button title="Hae aikataulu" onPress={handleSearch} color="#0B3B24" />
        </View>
      </View>
      {region ? (
        <View style={styles.containerMaps}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsUserLocation={true}
            onPress={handleMapPress}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </KeyboardAvoidingView>
  );
}

export default Bussilla;