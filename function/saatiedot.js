import React,{useState,useEffect} from 'react';
import {  Text, Image } from 'react-native';
import { API_URL, API_KEY, ICON_URL } from '../openweatherConfig';
import styles from '../style/styles';

export default function SaaTiedot({latitude,longitude}) {
  const [temp,setTemp] = useState(0);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [wind, setWind] = useState(0);
  const [suunta, setSuunta] = useState(0);

  useEffect(() => {
    const url = API_URL +
    'lat=' + latitude +
    '&lon=' + longitude +
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
        setIcon(ICON_URL +  result.weather[0].icon + '@2x.png');
      },
      (error) => { 
        alert(error);
      }     
    ) 
  }, [])
  const weatherInformation={temp:temp, description:description, wind:wind, suunta:suunta}
  return (
    weatherInformation
  )
}
