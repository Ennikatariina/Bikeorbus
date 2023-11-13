import Kirjautuminen from './components/Kirjautuminen';
import Tulos from './components/Tulos';
import Asetukset from './components/Asetukset';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: 'transparent'
        }}
        screenOptions={({ route }) => ({
          tabBarIcon:
            ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Kirjautuminen') {
                iconName = focused
                  ? 'account-circle'
                  : 'account-circle-outline';
              } else if (route.name === 'Tulos') {
                iconName = focused
                  ? 'chart-box'
                  : 'chart-box-outline';
              } else if (route.name === 'Asetukset') {
                iconName = focused
                  ? 'view-list'
                  : 'view-list-outline';
              }
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
          tabBarActiveTintColor: 'steelblue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Kirjautuminen" component={Kirjautuminen}   />
        <Tab.Screen name="Tulos" component={Tulos}   />
        <Tab.Screen name="Asetukset" component={Asetukset}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}