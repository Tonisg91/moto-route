import {Button} from 'react-native-paper'
import React from 'react'
import {StyleSheet} from 'react-native'

interface Props {
  mode?: 'contained' | 'outlined' | 'text'
  title: string
  onPress: () => void
}

export default function CustomButton({
  mode = 'contained',
  title,
  onPress,
}: Props) {
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

const styles = StyleSheet.create({
  labelStyle: {
    color: '#fff',
  },
})
