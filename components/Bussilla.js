import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import styles from "../style/styles";
import { fetchStopsByRadius } from "../Api";
import { apiKey } from "../digitransitConfig.js";
import { useFocusEffect } from "@react-navigation/native";
import { fetchStopIdByNameOrNumber } from "../Api";

function Bussilla({ navigation }) {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [region, setRegion] = useState(null);
  const mapRef = useRef(null);
  const [query, setQuery] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Lupa hylätty",
            "Sovellus tarvitsee luvan sijainnin käyttöön!"
          );
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
      return () => {};
    }, [])
  );

  const handleDestinationSubmit = async () => {
    let destinationLatLong = null;
    if (!destinationAddress) {
      se;
      alert("Destination address is required");
      return;
    }
    const digitransitGeocodingUrl = `https://api.digitransit.fi/geocoding/v1/search?text=${encodeURIComponent(
      destinationAddress
    )}&size=1`;

    try {
      const response = await fetch(digitransitGeocodingUrl, {
        headers: {
          "Content-Type": "application/json",
          "digitransit-subscription-key": apiKey,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const location = data.features[0].geometry.coordinates;
        destinationLatLong = {
          latitude: location[1],
          longitude: location[0],
        };
        if (mapRef.current && userLocation && destinationCoords) {
          const region = calculateRegion(userLocation, destinationCoords);
          mapRef.current.animateToRegion(region, 1000);
        }
      } else {
        alert("Ei löytynyt koordinaatteja annetulle osoitteelle.");
      }
    } catch (error) {
      alert("Virhe haettaessa koordinaatteja: " + error);
    }
    return destinationLatLong;
  };

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a stop number or name.");
      return;
    }
    try {
      const stops = await fetchStopIdByNameOrNumber(query);
      if (stops.length > 0) {
        const nearestStop = stops[0];
        navigation.navigate("Bussit", { stopId: nearestStop.gtfsId });
      } else {
        Alert.alert("Error", "No stops found, try another number or name!");
      }
    } catch (error) {
      console.error("Error fetching stops:", error);
      Alert.alert("Error", "Failed to fetch stop information!");
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    try {
      const stops = await fetchStopsByRadius(latitude, longitude, 30);
      if (stops.length > 0) {
        navigation.navigate("Bussit", { stopId: stops[0].gtfsId });
      } else {
        Alert.alert(
          "Pysäkkiä ei löydetty",
          "Ei pysäkkejä tällä alueella, tai tarkkuus ei ollut riittävä!"
        );
      }
    } catch (error) {
      console.error("Error fetching stops:", error);
      Alert.alert("Virhe", "Kohteen pysäkkien haku epäonnistui!");
    }
  };

  const handleNearestStop = async () => {
    if (!region) {
      alert("Sijaintitietoja ei ole saatavilla.");
      return;
    }
    try {
      const stops = await fetchStopsByRadius(
        region.latitude,
        region.longitude,
        500
      );
      if (stops.length > 0) {
        const nearestStop = stops[0];
        navigation.navigate("Bussit", { stopId: nearestStop.gtfsId });
      } else {
        Alert.alert(
          "Ei lähellä olevia pysäkkejä",
          "Ei löytynyt pysäkkejä läheltäsi."
        );
      }
    } catch (error) {
      console.error("Error fetching nearby stops:", error);
      Alert.alert("Virhe", "Lähimpien pysäkkien haku epäonnistui!");
    }
  };
  const handleBackToKoti = () => {
    navigation.navigate("Koti");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ position: "absolute", top: 20, left: 20 }}>
        <Button title="Takaisin" onPress={handleBackToKoti} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input2}
          placeholder="Syötä pysäkin nimi"
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.buttonContainer2}>
          <Button
            title="Hae aikataulu"
            onPress={handleSearch}
            color="#008080"
          />
        </View>
        <View style={styles.buttonContainer2}>
          <Button
            title="Näytä lähin pysäkki"
            onPress={handleNearestStop}
            color="#008080"
          />
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
