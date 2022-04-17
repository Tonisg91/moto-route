import React from 'react'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {LoginManager, AccessToken, Settings} from 'react-native-fbsdk-next'

import {LoginButton} from '../Buttons'
import {Alert} from 'react-native'

interface Props {
  authCB: (user: FirebaseAuthTypes.User) => void
}

Settings.setAppID('1407723659699590')

export default function FBSignIn({authCB}: Props) {
  const signIn = async () => {
    try {
      const response = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])

      if (response.isCancelled) {
        throw new Error('User cancelled the login process')
      }

      const userData = await AccessToken.getCurrentAccessToken()

      if (!userData) {
        throw new Error('No user data found')
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        userData.accessToken
      )

      // console.log({response, userData, facebookCredential})
      // Sign-in the user with the credential
      const sessionInfo = await auth().signInWithCredential(facebookCredential)
      authCB(sessionInfo.user)
    } catch (error: any) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        Alert.alert('Account already exists with different credential')
      }
      Alert.alert(error.message)
    }
  }

  return <LoginButton provider="facebook" onPress={signIn} />
}
