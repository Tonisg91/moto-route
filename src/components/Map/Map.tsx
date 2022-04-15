import React from 'react'
import {StyleSheet} from 'react-native'
import MapView from 'react-native-maps'
import {FullPageLoading} from '../Loading'
import useLocation from './useLocation'

export default function Map() {
  const {initialLocation, hasLocation} = useLocation()

  if (!hasLocation) {
    return <FullPageLoading />
  }
  return (
    <>
      <MapView
        style={styles.container}
        showsUserLocation
        initialRegion={{
          latitude: initialLocation!.latitude,
          longitude: initialLocation!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    width: 50,
    height: 50,
    overflow: 'hidden',
  },
})
