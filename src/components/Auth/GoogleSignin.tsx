import React from 'react'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {LoginButton} from '../Buttons'
import {GOOGLE_SIGNIN_CLIENT_ID} from '@env'

GoogleSignin.configure({
  webClientId: GOOGLE_SIGNIN_CLIENT_ID,
})

interface Props {
  authCB: (user: FirebaseAuthTypes.User) => void
}

export default function GoogleSignIn({authCB}: Props) {
  const signIn = async () => {
    try {
      const userData = await GoogleSignin.signIn()

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userData.idToken
      )

      // Sign-in the user with the credential
      const sessionInfo = await auth().signInWithCredential(googleCredential)
      authCB(sessionInfo.user)
    } catch (error) {
      console.error(error)
    }
  }

  return <LoginButton provider="google" onPress={signIn} />
}
