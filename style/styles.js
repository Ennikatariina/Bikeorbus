import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  footer: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  aloitus: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
  kirjautuminen: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tulos: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  aloitus: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
        textAlign: 'center',
      },
      button: {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'blue',
      },  
      pressable: {
        height: 60, 
        width: 160,   
        padding: 5,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#008080',
        borderWidth: 1,
        borderColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center',
     
      },
      pressableText: {
        color: 'white',  
        fontSize: 16,  
        fontWeight: 'bold',  
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
      inputContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
      },
      centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      labelContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
      },
      containerLabel: {
        flexDirection: 'row',
        marginTop: 10,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
      },
      containerMaps: {
        width: Dimensions.get('window').width,
        height: '65%', // Asettaa kartan korkeudeksi 50% näytön korkeudesta
      },
      map: {
        width: '100%',
        height: '100%',
      },
      container2: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F7F2E0',
      },
      content2: {
        flex: 1,
      },
      input2: {
        borderColor: '#6E6E6E',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      buttonContainer2: {
        marginBottom: 10,
      },
      listItem2: {
        backgroundColor: 'f0f0f0',
        padding: 15,
        borderRadius: 5,
        marginVertical: 8,
      },
      listItemText2: {
        fontSize: 16,
      },
      stopItem2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
      },
      mapContainer2: {
        height: 300,
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
      },
      map2: {
        height: '100%',
        width: '100%',
      },
  containerRow:{
    flexDirection: 'row'
    
  }
});