import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useAuth} from './context'

export default function Auth() {
  const auth = useAuth()
  console.log(auth)
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>Auth page</Text>
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
