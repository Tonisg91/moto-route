import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/views/HomeScreen';
import SettingsScreen from './src/views/SettingsScreen';
import {StyleSheet} from 'react-native';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.barStyle}
        activeColor="tomato"
        inactiveColor="black"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName = 'map-outline';

            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={20} color={color} />;
          },
        })}>
        <Tab.Screen name="Map" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    position: 'absolute',
    color: 'tomato',
  },
});
