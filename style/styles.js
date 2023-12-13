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
      header: {
        marginBottom: 15,
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center', 
        height: 100,  
        //marginTop: Platform.OS === 'ios' ? 20 : 0,       
      },
      logo: {
        width: 440, 
        height: 100, 
        marginRight: 5, 
      },
      etusivuText: {
        fontSize: 30,
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
});