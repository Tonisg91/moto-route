import React from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'

export function FullPageLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="#FCA311" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
})
