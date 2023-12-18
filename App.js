import Kirjautuminen from './components/Kirjautuminen';
import Tulos from './components/Tulos';
import Asetukset from './components/Asetukset';
import LuoKayttaja from './components/LuoKayttaja';
import Aloitus from './components/Aloitus';
import Koti from './components/Koti';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Bussilla from './components/Bussilla';
import Bussit from './components/Bussit';
import Pyoralla from './components/Pyoralla';
import Footer from './components/Footer';
import LomakePerustiedot from './components/LomakePerustiedot';
import MuutaTietoja from './components/MuutaTietoja';

const Stack = createStackNavigator();

export default function App() {

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Aloitus" component={Aloitus}   /> 
        <Stack.Screen name="LuoKayttaja" component={LuoKayttaja}   />
        <Stack.Screen name="Kirjautuminen" component={Kirjautuminen}   />
        <Stack.Screen name="Tulos" component={Tulos}   />
        <Stack.Screen name="Koti" component={Koti}   />
        <Stack.Screen name="Asetukset" component={Asetukset}  />
        <Stack.Screen name="Bussilla" component={Bussilla}  />
        <Stack.Screen name="Bussit" component={Bussit}  />
        <Stack.Screen name="Pyoralla" component={Pyoralla}  />     
        <Stack.Screen name="Tiedot" component={MuutaTietoja}   /> 
        <Stack.Screen name="LomakePerustiedot" component={LomakePerustiedot}   />
        <Stack.Screen name="MuutaTietoja" component={MuutaTietoja}   />
        </Stack.Navigator>
    </NavigationContainer>
    <Footer />
    </>
  );
 };
