import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {LoginButton} from '../Buttons'
import {useAuth} from './context'

export default function Auth() {
  const auth = useAuth()
  console.log(auth)
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Auth page</Text>
      </View>
      <View style={styles.buttonContainer}>
        <LoginButton provider="google" onPress={() => console.log('google')} />
        <LoginButton
          provider="facebook"
          onPress={() => console.log('facebook')}
        />
        <LoginButton
          provider="twitter"
          onPress={() => console.log('twitter')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#000',
  },
  buttonContainer: {
    flex: 2,
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
})
