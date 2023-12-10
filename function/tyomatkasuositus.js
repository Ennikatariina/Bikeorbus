import React from 'react';  // Import React
import saaTiedot from './saatiedot'
import getPersonalInformation from '../services/getPersonalInformation';
import {View, Text}from 'react-native';
import latitudeJaLongitude from './latitudeJaLongitude'

const tyomatkasuositus = async(latitude,longitude) => {
    //const location = latitudeJaLongitude()
    console.log("location",latitude)
    console.log("location",longitude)
    const latitude1=await latitude
    const longitude1=await longitude
    
    //Tieto tässä muodossa weatherInformation={temp:temp, description:description, wind:wind, suunta:suunta}
    const weatherInformation= await saaTiedot({latitude1,longitude1})
    console.log("weatherInformation", weatherInformation)

   

}
export default tyomatkasuositus;