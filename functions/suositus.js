import {View, Text}from 'react-native';

const suositus = () => {

    //console.log("Suositus",booleanArray)
    const booleanArray = {"rain": false, "slipperyConditions": true, "snow": true, "temp": true, "wind": true};
    let recommendation=''
    // Laske kuinka monta true on objektissa
    const trueCount = Object.values(booleanArray).filter(value => value === true).length;
    
    if (trueCount === 5) {
        return("Suositus: Voit pyöräillä töihin ilman huolta sääolosuhteista!");
      } else if (trueCount === 4) {
        const missingCondition = Object.keys(booleanArray).find(key => booleanArray[key] === false);
        return(`Suositus: Voit pyöräillä töihin, mutta tarkista sääolosuhteet, erityisesti ${missingCondition}.`);
      } else if (trueCount === 3) {
        const falseValues = Object.keys(booleanArray).filter(key => !booleanArray[key]);
        return(`Suositus: Tarkista sääolosuhteet, erityisesti ${falseValues.join(", ")}, ja harkitse pyöräilyä.`);
      } else if (trueCount === 2) {
        return("Suositus: Harkitse muita kulkumuotoja tai tarkista sääolosuhteet tarkemmin.");
      } else if (trueCount === 1) {
        return("Suositus: Tarkista sääolosuhteet huolellisesti ja harkitse muita kulkumuotoja.");
      } else {
        return("Suositus: Harkitse muita kulkumuotoja, sääolosuhteet eivät ehkä ole suotuisat pyöräilyyn.");
      }

}

export default suositus