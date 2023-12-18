import { StyleSheet } from 'react-native';
import { colorList } from './colors';
import { buttonStyles } from '../style/buttonstyles'

export const formStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
    padding: 8,
    borderRadius: 10,
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  formText: {
    fontSize: 22,
    margin: 5
  },
  input: {
    fontSize: 18,
    width: '80%',
    fontSize: 18,
    padding: 10,
    color: 'black',
    marginBottom: 30,
    borderBottomColor: '#BBCADF',
    borderBottomWidth: 2,
    backgroundColor: '#BBD1EE',
    borderRadius: 5,
    borderColor: 'gray',
    margin: 5
  },
  input2: {
    fontSize: 18,
    width: '80%',
    fontSize: 18,
    padding: 10,
    color: 'black',
    marginBottom: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    backgroundColor: colorList.inputBackgroundcolor,
    borderRadius: 5,
    borderColor: 'gray',
    margin: 5
  },
  pressable: {
    ...buttonStyles.pressable
  },
  pressableText: {
    ...buttonStyles.pressableText
  }

})