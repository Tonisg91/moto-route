import {Button} from 'react-native-paper'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface CustomButtonProps {
  mode?: 'contained' | 'outlined' | 'text'
  title: string
  onPress: () => void
}

export function CustomButton({
  mode = 'contained',
  title,
  onPress,
}: CustomButtonProps) {
  return (
    <Button
      onPress={onPress}
      color="#FCA311"
      mode={mode}
      labelStyle={styles.labelStyle}>
      {title}
    </Button>
  )
}

// Login Button
interface LoginButtonProps {
  onPress: () => void
  style?: StyleProp<ViewStyle>
  provider: 'google' | 'facebook' | 'twitter' | 'apple'
}

export function LoginButton({onPress, style, provider}: LoginButtonProps) {
  const iconNameHM = {
    google: 'logo-google',
    facebook: 'logo-facebook',
    twitter: 'logo-twitter',
    apple: 'logo-apple',
  }

  const backgroundColor = {
    google: '#fa3434',
    facebook: '#3b5998',
    twitter: '#1DA1F2',
    apple: '#000000',
  }

  return (
    <TouchableOpacity
      style={[
        styles.loginButtonContainer,
        {backgroundColor: backgroundColor[provider]},
        style,
      ]}
      onPress={onPress}>
      <Icon name={iconNameHM[provider]} size={30} color="#fff" />
      <Text style={styles.loginButtonText}>Login with {provider}</Text>
    </TouchableOpacity>
  )
}

// Floating Action Button
interface FloatButtonProps {
  iconName: string
  onPress: () => void
  style: StyleProp<ViewStyle>
}
export function FloatButton({iconName, onPress, style}: FloatButtonProps) {
  return (
    <View style={{...(style as any)}}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.floatButton, styles.shadow]}>
        <Icon name={iconName} color="#FCA311" size={30} />
      </TouchableOpacity>
    </View>
  )
}

/*
  loginButtonContainer: {
    width: '50%',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
  }
    loginButtonText: {
    fontWeight: '600',
    color: '#fff',
  }
*/

const styles = StyleSheet.create({
  labelStyle: {
    color: '#fff',
  },
  loginButtonContainer: {
    width: '50%',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
  },
  loginButtonText: {
    fontWeight: '700',
    color: 'white',
  },
  floatButton: {
    backgroundColor: '#fff',
    zIndex: 9999,
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 15,
  },
})
