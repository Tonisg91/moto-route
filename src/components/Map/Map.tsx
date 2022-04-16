import React, {useEffect, useRef} from 'react'
import {StyleSheet, View} from 'react-native'
import MapView from 'react-native-maps'
import {Text} from 'react-native-paper'

import {FloatButton} from '../Buttons'
import {FullPageLoading} from '../Loading'
import useLocation from './useLocation'

export default function Map() {
  const map = useRef<MapView>()
  const following = useRef<boolean>(true)
  const {
    initialLocation,
    hasLocation,
    getCurrentLocation,
    followUser,
    currentLocation,
    stopFollowing,
  } = useLocation()

  useEffect(() => {
    followUser()
    return () => {
      // TODO: Destroy watch id listener
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!currentLocation || !following.current) return

    const {latitude, longitude} = currentLocation

    map?.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    })
  }, [currentLocation])

  const centerPosition = async () => {
    following.current = true
    const {latitude, longitude} = await getCurrentLocation()

    map.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    })
  }

  if (!hasLocation) {
    return <FullPageLoading />
  }

  return (
    <>
      <MapView
        ref={element => (map.current = element!)}
        style={styles.container}
        onTouchStart={() => (following.current = false)}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={{
          latitude: initialLocation!.latitude,
          longitude: initialLocation!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <FloatButton
        iconName="locate-outline"
        onPress={centerPosition}
        style={styles.centerPositionButton}
      />
      <View style={styles.speedInfo}>
        <Text style={styles.speedText}>
          {Math.trunc((currentLocation?.speed || 0) * 3.6)}
        </Text>
      </View>
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
  centerPositionButton: {position: 'absolute', bottom: 20, right: 20},
  speedInfo: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 9999,
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    fontSize: 18,
    color: '#FCA311',
    fontWeight: 'bold',
  },
})
