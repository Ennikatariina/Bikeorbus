import React from 'react';
import { View, Text } from 'react-native';
import Asetukset from './Asetukset';
import Tulos from './Tulos';
import Bussilla from './Bussilla';
import Pyoralla from './Pyoralla';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default Koti = ({ navigation }) => {
  return (
    <Tab.Navigator
    initialRouteName="aloitus"
    screenOptions={({ route }) => ({
      headerStyle: {
        backgroundColor: '#293040',
      },
      headerTintColor: 'white',
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
          } else if (route.name === 'Bussilla') {
            iconName = focused
              ? 'bus'
              : 'bus';
          } else if (route.name === 'Pyöralla') {
            iconName = focused
              ? 'bike'
              : 'bike';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      tabBarActiveTintColor: 'steelblue',
      tabBarInactiveTintColor: 'gray',
    })}
    >
    <Tab.Screen name="Tulos" component={Tulos}   />  
    <Tab.Screen name="Asetukset" component={Asetukset}  />
    <Tab.Screen name="Bussilla" component={Bussilla}  />
    <Tab.Screen name="Pyöralla" component={Pyoralla}  />
  </Tab.Navigator>
  );
};