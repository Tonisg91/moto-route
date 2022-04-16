import {Button} from 'react-native-paper'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
  mode?: 'contained' | 'outlined' | 'text'
  title: string
  onPress: () => void
}

export function CustomButton({mode = 'contained', title, onPress}: Props) {
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

const styles = StyleSheet.create({
  labelStyle: {
    color: '#fff',
  },
  floatButton: {
    backgroundColor: 'black',
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
