import React,{useState,useEffect} from 'react';
import {  Text, Image, View } from 'react-native';
import { API_URL_FORECAST, API_KEY, ICON_URL } from '../openweatherConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from '../style/styles';



const getFormattedTime = (fullDateTime) => {
  const dateObject = new Date(fullDateTime);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

export default function Saaennuste({ latitude, longitude}) {
 
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const url =
              API_URL_FORECAST +
              'lat=' + latitude +
              '&lon=' + longitude +
              '&appid=' + API_KEY +
              '&units=metric';
              console.log(url)
            const response = await fetch(url);
           
            const result = await response.json();
            if (result && result.list && result.list.length > 0) {
              // Päivitä forecast-lista, jos se on käytettävissä
              setForecast(result.list);
            } else {
              alert('Virhe haettaessa säätietoja');
            }
          } catch (error) {
            alert(error.message);
          }
        };
      
        fetchData();
      }, [latitude, longitude]); 

  
     const getTemperatureAndTime = () => {
      if (!forecast || forecast.length < 4) {
        return null;
      }
    
      const temperaturesAndTimes = [];
    
      // Käydään läpi ensimmäiset kolme säätietoa
      for (let i = 1; i < 4; i++) {
        if (forecast[i] && forecast[i].main) {
          const temperature = forecast[i].main.temp;
          const time = getFormattedTime(forecast[i].dt_txt);
    
          temperaturesAndTimes.push({ temperature, time });
        }
      }
    
      return temperaturesAndTimes;
    };
    
  
    return (
      <View style={styles.containerRow}>
      
      {getTemperatureAndTime()?.map((data, index) => (
        <View key={index} style={styles.containerforecast}>
          <Text style={styles.textrforecast}>{`Klo ${data.time}, ${data.temperature}°C`}</Text>
        </View>
      ))}
    </View>
    )


}