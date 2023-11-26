import * as Location from 'expo-location';

export async function Paikka() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return null;
  }

  let location = await Location.getCurrentPositionAsync({});
  if (!location) {
    console.error('Location information is not available');
    return null;
  }

  console.log('Location fetched:', location.coords);
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  };
}

