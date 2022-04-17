import React from 'react'
import {Alert} from 'react-native'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {LoginManager, AccessToken, Settings} from 'react-native-fbsdk-next'

import {FB_APP_ID} from '@env'
import {LoginButton} from '../Buttons'

interface Props {
  authCB: (user: FirebaseAuthTypes.User) => void
}

Settings.setAppID(FB_APP_ID)

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
