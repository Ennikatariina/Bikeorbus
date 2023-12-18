import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import styles from "../style/styles";
import { Pressable } from "react-native";
import { authListener } from "../auth/authManager";
export default Aloitus = ({ navigation }) => {
  // Seuraa käyttäjän tilaa (onko kirjautuneena vai ei)
  authListener({ navigation });

  // Ekaan sivuun ei välttämättä tarvitse navbaria? Laitetaanko vasta kun kirjaudutaan?
  return (
    <>
      <Header />
      <View style={[styles.aloitus, { backgroundColor: "#E3E5E5" }]}>
        <View style={styles.laatikko}>
          <Text style={styles.etusivuText}>
            Tervetuloa Bikeorbus sovellukseen!
          </Text>
          <Text
            numberOfLines={4}
            style={{
              textAlign: "center",
              fontSize: 16,
              paddingBottom: 80,
              color: "#555",
            }}
          >
            Bike or Bus on sovellus, joka helpottaa liikkumistasi tarjoamalla
            tietoa sääolosuhteista ja kulkuvälinevalinnoista. Luo käyttäjä ja
            aloita seikkailusi!
          </Text>
          <Pressable
            style={{ ...styles.pressable, marginBottom: 30 }}
            onPress={() => navigation.navigate("LuoKayttaja")}
          >
            <Text style={{ ...styles.pressableText, fontSize: 18 }}>
              Luo käyttäjä
            </Text>
          </Pressable>

          <Pressable
            style={{ ...styles.pressable, marginBottom: 10 }}
            onPress={() => navigation.navigate("Kirjautuminen")}
          >
            <Text style={{ ...styles.pressableText, fontSize: 18 }}>
              Kirjaudu
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};
