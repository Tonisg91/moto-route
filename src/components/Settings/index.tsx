import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {CustomButton} from '../Buttons'
import {usePermissions} from './context'

export default function SettingsScreen() {
  const {permissions, askLocationPermission} = usePermissions()

  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 30}}>SettingsScreen</Text>
      <Text>{JSON.stringify(permissions)}</Text>
      <CustomButton title="Permissions" onPress={askLocationPermission} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
