import {useEffect, useRef, useState} from 'react'
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service'
import {useAuth} from '../Auth/context'
import {usePermissions} from '../Settings/context'

export default function useLocation() {
  const {user} = useAuth()
  const {permissions} = usePermissions()
  // TODO: Cambiar routelines
  const [routeLines, setRouteLines] = useState<GeoCoordinates[]>([])
  const [hasLocation, setHasLocation] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<GeoCoordinates>()
  const [initialLocation, setInitialLocation] = useState<GeoCoordinates>()

  const watchId = useRef<number>()
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  })

  useEffect(() => {
    if (permissions.locationStatus !== 'granted') return

    getCurrentLocation()
      .then(location => {
        if (!isMounted.current) return
        setInitialLocation(location)
        setCurrentLocation(location)
        setHasLocation(true)
      })
      .catch(error => console.error(error))
  }, [permissions.locationStatus])

  const getCurrentLocation = (): Promise<GeoCoordinates> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      )
    })
  }

  const followUser = () => {
    watchId.current = Geolocation.watchPosition(
      location => {
        // if (!isMounted.current) return
        setCurrentLocation(location.coords)
        setRouteLines(routes => [...routes, location.coords])
      },
      error => console.log(error),
      {enableHighAccuracy: true, distanceFilter: 2, interval: 1000}
    )
  }

  const startRecording = () => {
    if (!user?.uid) return
    followUser()
  }

  const stopFollowing = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current)
    }
  }

  return {
    initialLocation,
    currentLocation,
    hasLocation,
    getCurrentLocation,
    followUser,
    stopFollowing,
    routeLines,
    startRecording,
  }
}
