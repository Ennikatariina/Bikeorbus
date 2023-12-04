
import { formStyles } from '../style/formStyles';
import { SafeAreaView, Text, TextInput,Pressable, ScrollView, View } from "react-native";
import { useState } from 'react';
import { Switch, RadioButton } from 'react-native-paper';

export default LomakePerustiedot = ({ navigation }) => {

    const [address, setAddress]=useState('')
    const [age, setAge]=useState('')
    const [weight, setweight]=useState('')
    const [lowestTemperature, setLowestTemperature]=useState('')
    const [rain, setRain]=useState('')
    const [snowing, setSnowing]=useState('')
    const [wind, setWind]=useState('')
    const [slipperyConditions, setSlipperyConditions]=useState('')

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
                    keyboardType="numeric"
                    value={lowestTemperature}
                    onChangeText={setLowestTemperature}
                />
                <Text>Haluatko ajaa vesisateella</Text>
                <Switch value={rain} onValueChange={setRain} />

                <Text>Haluatko ajaa lumisateella</Text>
                <Switch value={snowing} onValueChange={setSnowing} />

                <Text>Minkälaisessa tuulessa voit pyörällä?</Text>
                <RadioButton.Group onValueChange={newValue => setWind(newValue)} value={wind}>
                <RadioButton.Item label="Tyyntä" value="first" />
                <RadioButton.Item label="Kohtalainen tuuli" value="second" color="blue" />
                <RadioButton.Item label="Navakka tuuli" value="third" color="green" />
                <RadioButton.Item label="Kova tuuli" value="fourth" color="red" />
                <RadioButton.Item label="Mysky tuuli" value="fifth" color="purple" />
                </RadioButton.Group>

                <Text>Haluatko ajaa liukkaalla kelillä (eli kuin lämpötila on +4-0 C)</Text>
                <Switch value={slipperyConditions} onValueChange={setSlipperyConditions} />

                <Pressable style={formStyles.pressable}>
                    <Text style={formStyles.pressableText}>Tallenna</Text>
                </Pressable>

                
            </ScrollView>
        </SafeAreaView>
    )
}