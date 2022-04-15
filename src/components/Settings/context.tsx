import React, {createContext, useContext, useEffect, useState} from 'react'
import {AppState, Platform} from 'react-native'
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions'

export interface PermissionsState {
  locationStatus: PermissionStatus
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
}

// Context
type PermissionsContextProps = {
  permissions: PermissionsState
  askLocationPermission: () => void
  checkLocationPermission: () => void
}

export const PermissionContext = createContext({} as PermissionsContextProps)

// Hook
export const usePermissions = () => useContext(PermissionContext)

// Provider
export function PermissionProvider({children}: {children: React.ReactNode}) {
  const [permissions, setPermissions] = useState(permissionInitState)

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') return
      checkLocationPermission()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else {
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }

    if (permissionStatus === 'blocked') {
      openSettings()
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    })
  }
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }

    if (permissionStatus === 'blocked') {
      console.warn('Please enable location services for this app')
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    })
  }

  return (
    <PermissionContext.Provider
      value={{permissions, askLocationPermission, checkLocationPermission}}>
      {children}
    </PermissionContext.Provider>
  )
}
