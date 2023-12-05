import React from 'react';  // Import React
import saatiedot from '../function/saatiedot'
import getPersonalInformation from '../services/getPersonalInformation';
import {View, Text}from 'react-native';

const Tyomatkasuositus = async({latitude,longitude}) => {
    
    //Ei toimi

    //weatherInformation={temp:temp, description:description, wind:wind, suunta:suunta}
    //const weatherInformation= await saatiedot({latitude,longitude})
    //console.log("weatherInformation", weatherInformation)

    return(
        <View>
            <Text>Jotain</Text>
        </View>
    )


}
export default Tyomatkasuositus;