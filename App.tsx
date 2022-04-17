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
import {AuthProvider, useAuth} from './src/components/Auth/context'
import Auth from './src/components/Auth'

const Tab = createMaterialBottomTabNavigator()

// React native maps deprecation depencencies
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."])

function AppState({children}: {children: React.ReactNode}) {
  return (
    <AuthProvider>
      <PermissionProvider>{children}</PermissionProvider>
    </AuthProvider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <BottomTabNavigator />
      </AppState>
    </NavigationContainer>
  )
}

function BottomTabNavigator() {
  const auth = useAuth()
  const {permissions} = usePermissions()

  if (auth.loading || permissions.locationStatus === 'unavailable') {
    return <FullPageLoading />
  }

  if (!auth.user) {
    return <Auth />
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
    color: 'tomato',
  },
})
