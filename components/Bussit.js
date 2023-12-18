import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Modal, KeyboardAvoidingView, Platform, Button } from 'react-native';
import fetchGraphQLData from '../Api';
import styles from '../style/styles';

function Bussit({ route, navigation }) {
  const { stopId } = route.params;
  const [stopDetails, setStopDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const query = `
          {
            stop(id: "${stopId}") {
              name
              stoptimesWithoutPatterns {
                scheduledArrival
                realtimeArrival
                arrivalDelay
                scheduledDeparture
                realtimeDeparture
                departureDelay
                realtime
                realtimeState
                serviceDay
                headsign
              }
            }
          }
        `;
        const data = await fetchGraphQLData(query);
        console.log("data",data);
        setStopDetails(data.data.stop);
      } catch (error) {
        console.error("API Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimetable();
  }, [stopId]);

  const formatTime = (seconds) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setSeconds(seconds);
    return date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.headsign}>Päätepysäkki: {item.headsign}</Text>
      <Text>Aikataulun saapumisaika: {formatTime(item.scheduledArrival)}</Text>
      <Text>Reaaliaikainen saapumisaika: {formatTime(item.realtimeArrival)}</Text>
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!stopDetails) {
    return <Text style={styles.infoText}>Tälle pysäkille ei löydetty tietoja. Pysäkin tunniste saattaa olla väärä.</Text>;
  }

  const handleBackToKoti = () => {
    navigation.navigate('Koti');
  };

  return (
    <KeyboardAvoidingView
      style={styles.bussitContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Lähtöpysäkki: {stopDetails.name}</Text>
        <FlatList
          data={stopDetails.stoptimesWithoutPatterns}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
        </Modal>
      </View>
      <View style={{paddingBottom: 20}}>
          <Button title="Takaisin" onPress={handleBackToKoti} />
      </View>
    </KeyboardAvoidingView>
  );
}

export default Bussit;