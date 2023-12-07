import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, TextInput, Button } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import config from '../digitransitConfig';
import styles from '../style/styles';
import Saa from './Saa';

const MapScreen = ({ latitude, longitude, destinationCoords }) => {
  console.log('MapScreen', latitude, longitude, destinationCoords);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${config.openRouteServiceApiKey}&start=${longitude},${latitude}&end=${destinationCoords}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.features && data.features[0] && data.features[0].geometry) {
          const { coordinates } = data.features[0].geometry;
          setCoordinates(coordinates.map(([longitude, latitude]) => ({ latitude, longitude })));
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        console.error('Failed to fetch route:', error);
        // Voit lisätä tässä tarvittavan virheenkäsittelyn
      }
    };

    if (destinationCoords) {
      fetchRoute();
    }
  }, [latitude, longitude, destinationCoords]);

  return (
    <View style={styles.containerMaps}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline coordinates={coordinates} strokeWidth={3} strokeColor="blue" />
      </MapView>
    </View>
  );
};

export default MapScreen;
