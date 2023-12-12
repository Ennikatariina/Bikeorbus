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

    const [personLowestTemperature, setPersonLowestTemperature] = useState('');
    const [personRain, setPersonRain] = useState(false);
    const [personSlipperyConditions, setPersonSlipperyConditions] = useState(false);
    const [personSnowing, setPersonSnowing] = useState(false);
    const [personWindy, setPersonWindy] = useState('');

    //UseEffect hakee sää tiedot latituden ja longituden mukaan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = API_URL +
          'lat=' + latitude1 +
          '&lon=' + longitude1 +
          '&units=metric' +
          '&appid=' + API_KEY;
  
        //console.log('Fetching data from:', url);
  
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
   // console.log("weatherInformation", weatherInformation)

    let personalinformation=''
    useEffect(() => {
      personalinformation = async () => {
        //Haetaan käyttäjän antamat tiedot
        const perInformation = await getPersonalInformation()
        //console.log("personalinformation",perInformation)
        setPersonLowestTemperature(perInformation.lowestTemperature)
        setPersonRain(perInformation.rain)
        setPersonSlipperyConditions(perInformation.slipperyConditions)
        setPersonSnowing(perInformation.snowing)
        setPersonWindy(perInformation.wind)
      }
      personalinformation()
    },[])
    
    //EHDOT
    //LÄMPÖTILA
    if (parseInt(temp, 10) >= parseInt(personLowestTemperature, 10)) {
      console.log('Sopiva lämpötila pyöräilyyn!');
    } else {
      console.log('Liian kylmä pyöräilyyn.');
    }
  
    //TUULI
    // Taulukko tuulen voimakkuuksista
    const windCategories = [
      { min: 0, max: 3, label: "tyyntä" },
      { min: 4, max: 7, label: "kohtalainen" },
      { min: 8, max: 13, label: "navakka" },
      { min: 14, max: 20, label: "kova" },
      { min: 21, max: 32, label: "myrsky" },
    ];


    // Etsi windCategories-taulukosta henkilön tuulen kategoria
    const windCategory = windCategories.find((category) => category.label === personWindy);

    // Tarkista, että löydettiin kategoria
    if (windCategory) {
      const { min, max } = windCategory;
      console.log(`Henkilön tuulen kategoria: ${personWindy}, Min: ${min}, Max: ${max}`);
    } else {
      console.log(`Henkilön tuulen kategoriaa "${personWindy}" ei löytynyt.`);
    }

      // Tarkista, että löydettiin kategoria
    if (windCategory) {
      const { min, max } = windCategory;

      // Vertaile henkilön tuulen kategoriaa tämän hetkiseen tuulen nopeuteen
      if (wind >= min && wind <= max) {
        console.log(`Tällä hetkellä sopiva tuuli henkilön määrittelemälle kategorialle "${personWindy}".`);
        // Tässä voit antaa lisätoimintoja, esim. antaa suosituksen lähteä pyöräilemään
      } else if (wind < min) {
        console.log(`Liian vähän tuulta henkilön määrittelemälle kategorialle "${personWindy}".`);
        // Tässä voit antaa lisätoimintoja, esim. antaa suosituksen olla lähtemättä pyöräilemään
      } else {
        console.log(`Liian paljon tuulta henkilön määrittelemälle kategorialle "${personWindy}".`);
        // Tässä voit antaa lisätoimintoja, esim. antaa suosituksen olla lähtemättä pyöräilemään
      }
    } else {
      console.log(`Henkilön tuulen kategoriaa "${personWindy}" ei löytynyt.`);
      // Tässä voit antaa lisätoimintoja, esim. antaa yleinen suositus
    }
        
    /* if (wind >= windCategories[0].min && wind <= windCategories[0].max) {
      console.log("Tuuli on tyyntä.");
    } else if (wind >= windCategories[1].min && wind <= windCategories[1].max) {
      console.log("Tuuli on kohtalaista tuulta.");
    } else if (wind >= windCategories[2].min && wind <= windCategories[2].max) {
      console.log("Tuuli on navakkaa tuulta.");
    } else if (wind >= windCategories[3].min && wind <= windCategories[3].max) {
      console.log("Tuuli on kovaa tuulta.");
    } else if (wind >= windCategories[4].min && wind <= windCategories[4].max) {
      console.log("Tuuli on myrskyä.");
    } else {
      console.log("Tuulen nopeus ei vastaa tunnettuja kategorioita.");
    } */
    

         
   return (
    <View>
        <Text>Tähän tulee työmatkasuositus</Text>
    </View>
   )

}
export default Tyomatkasuositus;