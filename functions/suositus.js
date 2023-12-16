import {View, Text}from 'react-native';

const suositus = ({booleanArray,weatherConditions}) => {

  console.log("Suositus",weatherConditions)
  //Tämä on testausta varten
  //const booleanArray = {"rain":false, "slipperyConditions": false, "snow": false, "temp": false, "wind": true};

  // Laske kuinka monta true on objektissa
  const trueCount = Object.values(booleanArray).filter(value => value === true).length;

  const returnListOneFalse={
    "wind":"tuulen ",
    "temp":"lämpötilan ",
    "slipperyConditions":"liukkauden ",
    "snow":"lumisateen ",
    "rain":"vesisateen ",
  }

  const returnListTwoOrMoreFalse={
    "wind":"tuulen ",
    "temp":"lämpötilan ",
    "slipperyConditions":"liukkauden ",
    "snow":"lumisateen ",
    "rain":"vesisateen ",
  }
  const falseValues = Object.keys(booleanArray).filter(key => !booleanArray[key]);
  const recommendation = falseValues.map(condition => returnListTwoOrMoreFalse[condition]);


  
  if (trueCount === 5) {
      return("Suosittelen, että pöyräilet töihin. Sää on loistava pöyräilyyn.");

    } else if (trueCount === 4) {
      const missingCondition = Object.keys(booleanArray).find(key => booleanArray[key] === false);
      return(`Suosittelen, että pöyräilet töihin, mutta tarkista pyöräilyolosuhteet ${returnListOneFalse[missingCondition]} osalta.`);

    } else if (trueCount === 3) {
      const lastRecommendation = recommendation.pop(); // Poista viimeinen suositus
      const joinedRecommendation = recommendation.join(", ") + " ja " + lastRecommendation;
      return `Harkitse pyöräilyä. Sääolosuhteet eivät vastaa ihanne pyöräily säätäsi ${joinedRecommendation} osalta.`;
      
    } else if (trueCount === 2) {
      const lastRecommendation = recommendation.pop(); // Poista viimeinen suositus
      const joinedRecommendation = recommendation.join(", ") + " ja " + lastRecommendation;
      return `Harkitse pyöräilyä. Sääolosuhteet eivät vastaa ihanne pyöräily säätäsi ${joinedRecommendation} osalta.`;

    } else if (trueCount === 1) {
      const lastRecommendation = recommendation.pop(); // Poista viimeinen suositus
      const joinedRecommendation = recommendation.join(", ") + " ja " + lastRecommendation;
      return `Harkitse pyöräilyä. Sääolosuhteet eivät vastaa ihanne pyöräily säätäsi ${joinedRecommendation} osalta.`;
    } else {
      return("Suositus: Tosi mies pyöräilisi, mutta sinulle suosittelen bussia.");
    }

}

export default suositus