import React, {createContext, useContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import {AppState, Platform} from 'react-native'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Auth {
  user: User | null
  loading: boolean
}

export const authInitState: Auth = {
  loading: true,
  user: null,
}

// Context
type AuthContextProps = {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

// Hook
export const useAuth = () => useContext(AuthContext)

// Provider
export function AuthProvider({children}: {children: React.ReactNode}) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user')
      setUser(JSON.parse(userData || 'null'))
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async () => {
    console.log('login')
  }

  const logout = async () => {
    console.log('logout')
  }

  return (
    <AuthContext.Provider value={{user, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  )
}
