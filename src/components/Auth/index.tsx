import React from 'react'
import {ImageBackground, StyleSheet, View} from 'react-native'
import {useAuth} from './context'
import FBSignIn from './FBSignin'
import GoogleSignIn from './GoogleSignin'

export default function Auth() {
  const {signIn} = useAuth()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/login-bg.jpg')}
        style={styles.container}>
        <View style={styles.logoContainer}>
          {/* <Text style={styles.logo}></Text> */}
        </View>
        <View style={styles.buttonContainer}>
          <GoogleSignIn authCB={signIn} />
          <FBSignIn authCB={signIn} />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: '#FFF',
    fontSize: 50,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
})
