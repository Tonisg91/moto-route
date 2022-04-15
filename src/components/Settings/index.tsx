import React from 'react';
import {StyleSheet, Text, View, Button, Platform} from 'react-native';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';

export default function SettingsScreen() {
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
    }

    if (permissionStatus === 'blocked') {
      console.warn('Please enable location services for this app');
    }

    console.log({permissionStatus});
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 30}}>SettingsScreen</Text>
      <Button title="Permission" onPress={checkLocationPermission} />
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
