import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Switch,
  Button,
} from "react-native";
import { formStyles } from "../style/formStyles";
//import { getUserDataFromFirebase, updateUserDataInFirebase } from '../services/getPersonalInformation'; // Replace with your own Firebase service
import getPersonalInformation from "../services/getPersonalInformation";
import addDataToFirebase from "../services/addData";
import styles from "../style/styles";
import { Alert } from "react-native";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MuutaTietoja = () => {
  const navigation = useNavigation();
  const [personalInformation, setPersonalInformation] = useState({
    address: "",
    age: "",
    weight: "",
    lowestTemperature: "",
    rain: false,
    snowing: false,
    wind: "",
    slipperyConditions: false,
  });

  //Haetaan käyttäjän antamat tiedot

  const [address, setAddress] = useState(personalInformation.address);
  const [age, setAge] = useState(personalInformation.age);
  const [weight, setWeight] = useState(personalInformation.weight);
  const [lowestTemperature, setLowestTemperature] = useState(
    personalInformation.lowestTemperature
  );
  const [rain, setRain] = useState(personalInformation.rain);
  const [snowing, setSnowing] = useState(personalInformation.snowing);
  const [wind, setWind] = useState(personalInformation.wind);
  const [slipperyConditions, setSlipperyConditions] = useState(
    personalInformation.slipperyConditions
  );
  const slipperyOnToggleSwitch = () =>
    setSlipperyConditions(!slipperyConditions);

  console.log(personalInformation);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getPersonalInformation();
        if (user) {
          setPersonalInformation(user);
          setAddress(user.address || "");
          setAge(user.age || "");
          setWeight(user.weight || "");
          setLowestTemperature(user.lowestTemperature || "");
          setRain(user.rain || false);
          setSnowing(user.snowing || false);
          setWind(user.wind || "");
          setSlipperyConditions(user.slipperyConditions || false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleAddData = async () => {
    console.log("Tallenna nappia painettu");
    try {
      await addDataToFirebase(
        address,
        age,
        weight,
        lowestTemperature,
        rain,
        snowing,
        wind,
        slipperyConditions
      );
      // If the update is successful, show an alert to the user
      Alert.alert("Tiedot päivitetty!", "Information updated successfully!");
      // setModalVisible(false);
    } catch (error) {
      // If there's an error, show an error alert to the user
      console.error("Ongelmia tietojen tallennuksessa:", error);
      Alert.alert(
        "Virhe tallennuksessa",
        "Pahoittelut mutta jotain meni pieleen."
      );
    }
  };

  const handleBackToKoti = () => {
    navigation.navigate("Koti");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={formStyles.container}>
          <Text style={styles.etusivuText}>Muuta tietojasi</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={formStyles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={formStyles.input}
            placeholder="Weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={formStyles.input}
            placeholder="Lowest temperature"
            keyboardType="numeric"
            value={lowestTemperature}
            onChangeText={setLowestTemperature}
          />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Haluatko pyöräillä sateella?
          </Text>
          <Switch
            value={rain}
            onValueChange={setRain}
            trackColor={{ false: "#767577", true: "#a2e1fa" }}
            color="#a2e1fa"
            ios_background="#000000"
          />
          <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "bold" }}>
            Haluatko pyöräillä lumisateessa?
          </Text>
          <Switch
            value={snowing}
            onValueChange={setSnowing}
            trackColor={{ false: "#767577", true: "#a2e1fa" }}
            color="#a2e1fa"
            ios_background="#000000"
          />
          <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "bold" }}>
            Haluatko ajaa liukkaalla kelillä
          </Text>
          <Switch
            value={slipperyConditions}
            onValueChange={setSlipperyConditions}
            trackColor={{ false: "#767577", true: "#a2e1fa" }}
            color="#a2e1fa"
            ios_background="#000000"
          />
          <Text style={{ fontSize: 15, marginTop: 20, fontWeight: "bold" }}>
            Minkälaisessa tuulessa voit pyörällä?
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setWind(newValue)}
            value={wind}
          >
            <RadioButton.Item label="Tyyntä" value="Tyyntä" color="black"/>
            <RadioButton.Item
              label="Kohtalainen tuuli"
              value="kohtalainen"
              color="blue"
            />
            <RadioButton.Item
              label="Navakka tuuli"
              value="navakka"
              color="green"
            />
            <RadioButton.Item label="Kova tuuli" value="kova" color="red" />
            <RadioButton.Item
              label="Mysky tuuli"
              value="myrsky"
              color="purple"
            />
          </RadioButton.Group>
          <Pressable onPress={handleAddData} style={styles.pressable}>
            <Text style={styles.pressableText}>Tallenna tiedot!</Text>
          </Pressable>
          <Button title="Takaisin" onPress={handleBackToKoti} color="#1C3659" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MuutaTietoja;
