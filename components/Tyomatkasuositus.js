import React, { useEffect, useState } from 'react';  // Import React
import getPersonalInformation from '../services/getPersonalInformation';
import {View, Text}from 'react-native';
import { API_URL, API_KEY, ICON_URL } from '../openweatherConfig';


const Tyomatkasuositus = ({latitude,longitude}) => {

    const latitude1=latitude
    const longitude1=longitude
    const [temp,setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [wind, setWind] = useState(0);
    const [suunta, setSuunta] = useState(0);

    //UseEffect hakee sää tiedot latituden ja longituden mukaan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = API_URL +
          'lat=' + latitude1 +
          '&lon=' + longitude1 +
          '&units=metric' +
          '&appid=' + API_KEY;
  
        console.log('Fetching data from:', url);
  
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
  
        const result = await response.json();
  
        setTemp(result.main.temp);
        setDescription(result.weather[0].description);
        setWind(result.wind.speed);
        setSuunta(result.wind.deg);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Check the console for details.');
      }
    };
  
    fetchData();
  }, [latitude1, longitude1]);

  
    const weatherInformation = {temp, description, wind, suunta}
    console.log("weatherInformation", weatherInformation)

    //Haetaan käyttäjän antamat tiedot
    const personalInformation =  getPersonalInformation()
    console.log(personalInformation)
         
   return (
    <View>
        <Text>Tähän tulee työmatkasuositus</Text>
    </View>
   )

}
export default Tyomatkasuositus;