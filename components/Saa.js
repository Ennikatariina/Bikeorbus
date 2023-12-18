import React,{useState,useEffect} from 'react';
import {  Text, View } from 'react-native';
import { API_URL, API_KEY } from '../openweatherConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from '../style/styles';

export default function Saa({ latitude, longitude}) {
  const [temp,setTemp] = useState(0);
  const [description, setDescription] = useState('');
  const [wind, setWind] = useState(0);
  const [suunta, setSuunta] = useState(0);
  const windDirectionIcon = getWindDirectionIcon(suunta);

  useEffect(() => {
    const url = API_URL +
    'lat=' + latitude +
    '&lon=' + longitude +
    '&units=metric' +
    '&appid=' + API_KEY +
    '&lang=fi';
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => { 
        setTemp(result.main.temp);
        setDescription(result.weather[0].description);
        setWind(result.wind.speed);
        setSuunta(result.wind.deg);
      },
      (error) => { 
        alert(error);
      }     
    )    
  }, [latitude, longitude])

  function getWindDirectionIcon(degrees) {
    if (degrees >= 22.5 && degrees < 67.5) {
      return 'arrow-top-right'; // Koillinen
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return 'arrow-right'; // Itä
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return 'arrow-bottom-right'; // Kaakko
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return 'arrow-down'; // Etelä
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return 'arrow-bottom-left'; // Lounas
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return 'arrow-left'; // Länsi
    } else if (degrees >= 292.5 && degrees < 337.5) {
      return 'arrow-top-left'; // Luode
    } else {
      return 'arrow-up'; // Pohjoinen
    }
  }
  
  return (
    <View style={styles.containerLabel}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Lämpötila</Text>
        <Text>{temp}</Text>
        <Text style={styles.label}>Kuvaus</Text>
          <Text>{description}</Text>
      </View>
      <View style={styles.labelContainer}>
      <Text style={styles.label}>Tuulen nopeus ja suunta</Text>
        <Text>{wind}</Text>
        <View style={styles.label}>
          <MaterialCommunityIcons name={windDirectionIcon} size={24} color="black" />
      </View>    
        </View>
      </View>
  );
}
