import { StyleSheet } from 'react-native';
import{colorList} from './colors';

export const buttonStyles = StyleSheet.create({
    button: {
      backgroundColor: colorList.buttonColor,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colorList.buttonColor,
    },
    pressable: {
      height: 60, 
      width: 160,   
      padding: 5,
      margin: 10,
      borderRadius: 5,
      backgroundColor: colorList.buttonColor,
      borderWidth: 1,
      borderColor: colorList.buttonColor,
      justifyContent: 'center',
      alignItems: 'center',
    
    },
    pressableText: {
      color: 'white',  
      fontSize: 18,  
      fontWeight: 'bold',  
    },
  
})