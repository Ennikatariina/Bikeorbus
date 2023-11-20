import { StyleSheet } from 'react-native';
import{buttonColor} from './colors';

export const buttonStyles = StyleSheet.create({
    button: {
        backgroundColor: buttonColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: buttonColor,
      },
      pressable: {
        height: 60, 
        width: 160,   
        padding: 5,
        margin: 10,
        borderRadius: 5,
        backgroundColor: buttonColor,
        borderWidth: 1,
        borderColor: buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
     
      },
      pressableText: {
        color: 'white',  
        fontSize: 18,  
        fontWeight: 'bold',  
      },
    
})