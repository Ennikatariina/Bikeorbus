import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import fetchGraphQLData from '../Api';

function Bussit({ route }) {
  const { stopId } = route.params; // gtfsId passed from HomeScreen
  const [stopDetails, setStopDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetching timetable
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

  // Function to format the time (assuming time is in seconds since midnight)
  const formatTime = (seconds) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // reset to midnight
    date.setSeconds(seconds);
    return date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
  };

  // Rendering timetables
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
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
    </KeyboardAvoidingView>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F7F2E0',
  },
  content: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#e6e1cf',
    borderColor: '#6E6E6E',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  headsign: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F7F2E0',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTextInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
});

export default Bussit;