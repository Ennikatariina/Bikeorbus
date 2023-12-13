import React, { useEffect, useState, useRef } from 'react';  // Import React
import getPersonalInformation from '../services/getPersonalInformation';
import {View, Text}from 'react-native';
import { API_URL, API_KEY, ICON_URL } from '../openweatherConfig';
import suositus from '../functions/suositus'


const Tyomatkasuositus =({latitude,longitude}) => {

    const latitude1= latitude
    const longitude1= longitude
    const [temp,setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [wind, setWind] = useState(0);
    const [suunta, setSuunta] = useState(0);

    const [personalInformation, setPersonalInformation]= useState({})

    //false tarkoittaa kyseisen ehdon kohdalla että mene bussilla. jos se vaihetaan true, niin se sääolosuhde puoltaa pyörällä menoa
    let booleanArray={"temp":false, "wind": false, "rain": false, "slipperyConditions": false, "snow":false}
    

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

  
    
  useEffect(() => {
    const personalinformation = async () => {
      try {
        // Haetaan käyttäjän antamat tiedot
        const personalInformation1 = await getPersonalInformation();
        setPersonalInformation(personalInformation1);
        console.log("personalinformation", personalInformation1);
  
        return personalInformation1;
      } catch (error) {
        console.error("Error fetching personal information:", error);
      }
    };
  
    personalinformation();
  }, []);

  
    
    //EHDOT
    //LÄMPÖTILA
    if (parseInt(temp, 10) >= parseInt(personalInformation.lowestTemperature, 10)) {
      booleanArray = { ...booleanArray, temp: true };
      //console.log('Sopiva lämpötila pyöräilyyn!');
      
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
    const windCategory = windCategories.find((category) => category.label === personalInformation.wind);

      // Tarkista, että löydettiin kategoria
    if (windCategory) {
      const { min, max } = windCategory;

      // Vertaile henkilön tuulen kategoriaa tämän hetkiseen tuulen nopeuteen
      if (wind >= min && wind <= max) {
        booleanArray = { ...booleanArray, wind: true };
        //console.log(`Tällä hetkellä sopiva tuuli henkilön määrittelemälle kategorialle "${personalInformation.wind}".`);
        
      } else if (wind < min) {
        booleanArray = { ...booleanArray, wind: true };
        //console.log(`sopiva pöyräilysää tuulen puolesta`);
        
      } else {
        //console.log(`Liian paljon tuulta henkilön määrittelemälle kategorialle "${personalInformation.wind}".`);
     
      }
    } else {
      //console.log(`Henkilön tuulen kategoriaa "${personalInformation.wind}" ei löytynyt.`);
      
    }
        
   //LIUKASKELI
   
  if (personalInformation.slipperyConditions == false){
    if (temp <= 4 && temp >=-1 ){
        //console.log("Liukaskeli, men bussilla")
       
    }
    else{
      booleanArray = { ...booleanArray, slipperyConditions: true };
      //console.log("Voit mennä pöyrällä. Keli ei ole liukas")
    }
   }
  else{
    booleanArray = { ...booleanArray, slipperyConditions: true };
    //console.log("Voit ajaa liukkaalla kelillä")
  }
   
  //SADE
  if (personalInformation.rain == false){
    if ( description=="rain"){
        //console.log("Sataa, mene bussilla")
        
    }
    else{
      booleanArray = { ...booleanArray, rain: true };
      //console.log("Ei sada mene vain pöyrällä")
    }
   }
  else{
    booleanArray = { ...booleanArray, rain: true };
    //console.log("Sinua ei haittaa pöyräillä sateelle")
  }

  //LUMISADE
  if (personalInformation.snowing == false){
    if ( description=="snow"){
        //console.log("Sataa lunta, mene bussilla")
        
    }
    else{
      booleanArray = { ...booleanArray, snow: true };
      //console.log("Ei sada lunta mene vain pöyrällä")
    }
   }
  else{
    booleanArray = { ...booleanArray, snow: true };
    //console.log("Sinua ei haittaa pöyräillä lumisateelle")
  }

  console.log(booleanArray)
  const recommendation=suositus({booleanArray})
   return (
    <View>
        <Text>Tähän tulee työmatkasuositus</Text>
        <Text>{recommendation}</Text>
        
    </View>
   )

}
export default Tyomatkasuositus;