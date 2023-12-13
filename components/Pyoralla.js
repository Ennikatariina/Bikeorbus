import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import { apiKey, apiKey2 } from '../digitransitConfig.js';
import { Paikka } from './KayttajaPaikannus';
import styles from '../style/styles';
import { API_KEY } from '../openweatherConfig.js';

const Pyoralla = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distanceInKm, setDistanceInKm] = useState(null);
  const mapRef = useRef(null);


  useEffect(() => {
    const fetchUserLocation = async () => {
      const location = await Paikka();
      if (location) {
        setUserLocation(location);
      } else {
        alert("Sijaintitietoja ei ole saatavilla.");
      }
    };

    fetchUserLocation();
  }, []);

  async function fetchRouteData(query, variables = {}) {
    const url = 'https://api.digitransit.fi/routing/v1/routers/finland/index/graphql';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'digitransit-subscription-key': apiKey,
      },
      body: JSON.stringify({ query, variables }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

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
      console.log("data",data.features)
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

  const calculateRegion = (fromCoords, toCoords) => {
    // Lasketaan keskipiste
    const latitude = (fromCoords.latitude + toCoords.latitude) / 2;
    const longitude = (fromCoords.longitude + toCoords.longitude) / 2;
  
    // Lasketaan etäisyydet
    const latitudeDelta = Math.abs(fromCoords.latitude - toCoords.latitude) * 2;
    const longitudeDelta = Math.abs(fromCoords.longitude - toCoords.longitude) * 2;
  
    // Palautetaan alue, joka sisältää molemmat koordinaatit
    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    };
  };
  

  useEffect(() => {
    const fetchRoute = async () => {
      if (userLocation && destinationCoords) {
        const query = `
          query GetRoute($fromPlace: String!, $toPlace: String!) {
            plan(
              fromPlace: $fromPlace,
              toPlace: $toPlace,
              transportModes: {mode: BICYCLE}
            ) {
              itineraries {
                walkDistance
                duration
                legs {
                  mode
                  startTime
                  endTime
                  from {
                    lat
                    lon
                    name
                  }
                  to {
                    lat
                    lon
                    name
                  }
                  distance
                  legGeometry {
                    length
                    points
                  }
                }
              }
            }
          }
        `;
        const variables = {
          fromPlace: `${userLocation.latitude},${userLocation.longitude}`,
          toPlace: `${destinationCoords.latitude},${destinationCoords.longitude}`
        };
        try {
          const data = await fetchRouteData(query, variables);
          console.log("API Response:", JSON.stringify(data, null, 2));
          if (data && data.data && data.data.plan && data.data.plan.itineraries && data.data.plan.itineraries.length > 0) {
            const itinerary = data.data.plan.itineraries[0];
            setDistanceInKm((itinerary.walkDistance / 1000).toFixed(2))
            let allCoordinates = [];
      
            itinerary.legs.forEach(leg => {
              const decodedPoints = polyline.decode(leg.legGeometry.points);
              const legCoordinates = decodedPoints.map(point => ({
                latitude: point[0],
                longitude: point[1]
              }));
              allCoordinates = allCoordinates.concat(legCoordinates);
            });
      
            setRouteCoordinates(allCoordinates);
          } else {
            console.error('Ei reittitietoja saatavilla');
          }
        } catch (error) {
          console.error('Error fetching route data:', error);
        }
      }
    }
    fetchRoute();
  }, [userLocation, destinationCoords]);

  if (!userLocation) {
    return <Text>Sijaintitietoja ladataan...</Text>;
  }
}


  return (
    
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter destination address"
          onChangeText={setDestinationAddress}
          value={destinationAddress}
        />
        <Button title="Submit" onPress={handleDestinationSubmit} />
      </View>
      </View>
     

          <Polyline coordinates={routeCoordinates} strokeWidth={3} strokeColor="blue" />
        </MapView>

        </View>
        </View>

export default Pyoralla;
        
      