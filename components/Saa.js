import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { API_URL, API_KEY, ICON_URL } from '../openweatherConfig';


export default function Saa({latitude,longitude}) {
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

  return (
    <>
      <Text style={styles.label}>Lämpötila</Text>
      <Text> {temp}</Text>
      <Text style={styles.label}>Tuulen nopeus</Text>
      <Text> {wind} </Text>
      <Text style={styles.label}>Tuulen suunta</Text>
      <Text> {suunta} </Text>
      <Text style={styles.label}>Description</Text>
      <Text>{description}</Text>
      <Image source={{uri: icon ? icon : null}} style={{width: 100,height: 100}}/>
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  }
});