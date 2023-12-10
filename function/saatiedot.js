import React,{useState,useEffect} from 'react';
import {  Text, Image } from 'react-native';
import { API_URL, API_KEY, ICON_URL } from '../openweatherConfig';
import styles from '../style/styles';

const SaaTiedot = async ({ latitude, longitude }) => {
  console.log("saatiedot",longitude)
  const [temp,setTemp] = useState(0);
  const [description, setDescription] = useState('');
  const [wind, setWind] = useState(0);
  const [suunta, setSuunta] = useState(0);
  
  const latitude1=await latitude
  const longitude1=await longitude

  console.log("säätietodt",latitude1)
  console.log(longitude1)
  useEffect(() => {
    const url = API_URL +
    'lat=' + latitude1 +
    '&lon=' + longitude1 +
    '&units=metric' +
    '&appid=' + API_KEY;
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
  
  const weatherInformation={temp:temp, description:description, wind:wind, suunta:suunta}
  console.log("##### säätiedot",weatherInformation)
  return (
    weatherInformation
  )
}
export default SaaTiedot;