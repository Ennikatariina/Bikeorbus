import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import styles from '../style/styles';
import { urlWithApiKey, apiKey, apiUrl } from '../digitransitConfig';

const MapScreen = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      const query = `GraphQL-kyselysi tähän`;

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/graphql',
            'digitransit-subscription-key': apiKey
          },
          body: query
        });
        const jsonResponse = await response.json();
        // Muunna jsonResponse sopivaan muotoon ja aseta reittikoordinaatit
        setRouteCoordinates(muunnetutKoordinaatit);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, []);

  return (
    <View style={styles.containerMaps}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000" // musta
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
