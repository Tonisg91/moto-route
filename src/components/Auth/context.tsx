import React, {createContext, useContext, useEffect, useState} from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
// import {AppState, Platform} from 'react-native'
export interface Auth {
  user: FirebaseAuthTypes.User | null
  loading: boolean
}

export const authInitState: Auth = {
  loading: true,
  user: null,
}

// Context
type AuthContextProps = {
  user: FirebaseAuthTypes.User | null
  loading: boolean
  signIn: (user: FirebaseAuthTypes.User) => void
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

// Hook
export const useAuth = () => useContext(AuthContext)

// Provider
export function AuthProvider({children}: {children: React.ReactNode}) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadUser = async () => {
    try {
      const userData = auth().currentUser
      // const userData = await AsyncStorage.getItem('@user')

      setUser(userData)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async (userData: FirebaseAuthTypes.User) => {
    setUser(userData)
  }

  const signOut = async () => {
    auth().signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  )
}
