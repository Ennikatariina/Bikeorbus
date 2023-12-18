
import { formStyles } from '../style/formStyles';
import { SafeAreaView, Text, TextInput,Pressable, ScrollView, View } from "react-native";
import { useState } from 'react';
import { Switch, RadioButton } from 'react-native-paper';
import addDataToFirebase from '../services/addData'


export default LomakePerustiedot = ( {setModalVisible} ) => {

    const [address, setAddress]=useState('')
    const [age, setAge]=useState('')
    const [weight, setweight]=useState('')
    const [lowestTemperature, setLowestTemperature]=useState('')
    const [rain, setRain]=useState(false)
    const [snowing, setSnowing]=useState(false)
    const [wind, setWind]=useState('')
    const [slipperyConditions, setSlipperyConditions]=useState(false)

    
    
    const slipperyOnToggleSwitch = () => setSlipperyConditions(!slipperyConditions);
    const snowOnToggleSwitch = () => setSnowing(!snowing);
    const rainOnToggleSwitch = () => setRain(!rain);
        
    const handleAddData = async() => {
        await addDataToFirebase(address,age, weight,lowestTemperature, rain,snowing, wind, slipperyConditions)
        setModalVisible(false)
    }
    return(
        <SafeAreaView style={formStyles.container}>
            <ScrollView>
               <Text style={formStyles.formText}>Perustiedot</Text>
                <TextInput style={formStyles.input}
                    placeholder="Osoite"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput style={formStyles.input}
                    placeholder="Ikä"
                    value={age}
                    onChangeText={setAge}
                />

                <TextInput style={formStyles.input}
                    placeholder="Paino"
                    value={weight}
                    onChangeText={setweight}
                />
                <Text style={formStyles.formText}>Sopivat sää olosuhteet</Text>
                <Text style={formStyles.formText}>Pakkasraja</Text>
                <Text>Aseta alin lämpötila jolla lähdet pyöräilemään</Text>
                <TextInput
                    style={formStyles.input}
                    placeholder="Syötä lämpötila"
                   
                    value={lowestTemperature}
                    onChangeText={setLowestTemperature}
                />
                <Text>Haluatko ajaa vesisateella</Text>
                <Switch value={rain} onValueChange={rainOnToggleSwitch} />

                <Text>Haluatko ajaa lumisateella</Text>
                <Switch value={snowing} onValueChange={snowOnToggleSwitch} />

                <Text>Minkälaisessa tuulessa voit pyörällä?</Text>
                <RadioButton.Group onValueChange={newValue => setWind(newValue)} value={wind}>
                    <RadioButton.Item 
                        label="Tyyntä" 
                        value="tyyntä" 
                        accessibilityLabel="Tyyntä, valitse tämä jos ei tunnu tuulta lainkaan"
                    />
                    <RadioButton.Item 
                        label="Kohtalainen tuuli" 
                        value="kohtalainen" 
                        color="blue" 
                        accessibilityLabel="Kohtalainen tuuli, valitse tämä jos tuuli tuntuu, mutta ei haittaa pyöräilyä"
                    />
                    <RadioButton.Item 
                        label="Navakka tuuli" 
                        value="navakka" 
                        color="green" 
                        accessibilityLabel="Navakka tuuli, valitse tämä jos tuuli on voimakas"
                    />
                    <RadioButton.Item 
                        label="Kova tuuli" 
                        value="kova" 
                        color="red" 
                        accessibilityLabel="Kova tuuli, valitse tämä jos pyöräily voi olla haastavaa kovassa tuulessa"
                    />
                    <RadioButton.Item 
                        label="Mysky tuuli" 
                        value="myrsky" 
                        color="purple" 
                        accessibilityLabel="Myrsky tuuli, valitse tämä jos pyöräilyä ei suositella myrskytuulessa"
                    />
                    </RadioButton.Group>


                <Text>Haluatko ajaa liukkaalla kelillä (eli kuin lämpötila on +4-(-1) C)</Text>
                <Switch value={slipperyConditions} onValueChange={slipperyOnToggleSwitch} />

                <Pressable style={formStyles.pressable} onPress={handleAddData}>
                    <Text style={formStyles.pressableText}>Tallenna</Text>
                </Pressable>

                
            </ScrollView>
        </SafeAreaView>
    )
}