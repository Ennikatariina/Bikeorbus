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
          } else if (route.name === 'Bussilla') {
            iconName = focused
              ? 'bus'
              : 'bus';
          } else if (route.name === 'Pyörällä') {
            iconName = focused
              ? 'bike'
              : 'bike';
          } else if (route.name === 'Asetukset') {
            iconName = focused
              ? 'view-list'
              : 'view-list-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={48} color={color} />;
        },
      tabBarActiveTintColor: '#1C3659',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 70,
      },
      tabBarLabelStyle: {
        fontSize: 16,
      },
    })}
    >
    <Tab.Screen name="Tulos" component={Tulos}   />  
    <Tab.Screen name="Pyörällä" component={Pyoralla}  />
    <Tab.Screen name="Bussilla" component={Bussilla}  />
    <Tab.Screen name="Asetukset" component={Asetukset}  />
  </Tab.Navigator>
  );
};