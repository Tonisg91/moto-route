import React from 'react'
import {StyleSheet, LogBox} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './src/components/Map'
import SettingsScreen from './src/components/Settings'
import {
  PermissionProvider,
  usePermissions,
} from './src/components/Settings/context'
import {FullPageLoading} from './src/components/Loading'

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."])

  return (
    <NavigationContainer>
      <AppState>
        <BottomTabNavigator />
      </AppState>
    </NavigationContainer>
  )
}

function AppState({children}: {children: React.ReactNode}) {
  return <PermissionProvider>{children}</PermissionProvider>
}

function BottomTabNavigator() {
  const {permissions} = usePermissions()

  if (permissions.locationStatus === 'unavailable') {
    return <FullPageLoading />
  }

  return (
    <Tab.Navigator
      barStyle={styles.barStyle}
      activeColor="#FCA311"
      inactiveColor="black"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName = 'map-outline'

          if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={20} color={color} />
        },
      })}>
      <Tab.Screen name="Map" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    position: 'absolute',
    color: 'tomato',
  },
})
