import {useEffect, useState} from 'react'
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service'

export default function useLocation() {
  const [hasLocation, setHasLocation] = useState(false)
  const [initialLocation, setInitialLocation] = useState<GeoCoordinates>()

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setInitialLocation(position.coords)
        setHasLocation(true)
      },
      error => {
        console.error(error.code, error.message)
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    )
  }, [])

  return {initialLocation, hasLocation}
}
