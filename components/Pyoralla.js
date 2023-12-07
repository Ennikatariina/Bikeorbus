import React, { useState, useEffect } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import config from '../digitransitConfig';

const MapScreen = ({ originLatitude, originLongitude, destinationLatitude, destinationLongitude }) => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${config.openRouteServiceApiKey}&start=${originLongitude},${originLatitude}&end=${destinationLongitude},${destinationLatitude}`);
      const data = await response.json();
      const { coordinates } = data.features[0].geometry;
      setCoordinates(coordinates.map(([longitude, latitude]) => ({ latitude, longitude })));
    };

    fetchRoute();
  }, [originLatitude, originLongitude, destinationLatitude, destinationLongitude]);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: originLatitude,
        longitude: originLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Polyline coordinates={coordinates} strokeWidth={3} strokeColor="blue" />
    </MapView>
  );
};

export default MapScreen;


