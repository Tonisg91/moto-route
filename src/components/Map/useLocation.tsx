import {useEffect, useRef, useState} from 'react'
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service'

export default function useLocation() {
  const [hasLocation, setHasLocation] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<GeoCoordinates>()
  const [initialLocation, setInitialLocation] = useState<GeoCoordinates>()

  const watchId = useRef<number>()

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        setInitialLocation(location)
        setCurrentLocation(location)
        setHasLocation(true)
      })
      .catch(error => console.error(error))
  }, [])

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
        setCurrentLocation(location.coords)
      },
      error => console.log(error),
      {enableHighAccuracy: true, distanceFilter: 5}
    )
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
  }
}
