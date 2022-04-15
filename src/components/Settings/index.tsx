import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 30}}>SettingsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
