import { StyleSheet } from 'react-native';
import { colorList } from './colors';
import {buttonStyles} from '../style/buttonstyles'

export const formStyles = StyleSheet.create({
    container:{
        backgroundColor:colorList.primary,
        alignItems: 'center',
        margin:10,
        borderRadius:8,
        padding:8
    },
    formText:{
        fontSize:22,
        margin:5
    },
    input: {
        fontSize: 18,
        width: '80%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: colorList.inputBackgroundcolor,
        borderWidth: 1,
        borderColor: 'gray',
        margin:5
      },
      pressable: {
        ...buttonStyles.pressable
      },
      pressableText:{
        ...buttonStyles.pressableText
      }

})