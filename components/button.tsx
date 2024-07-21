import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { commonStyles } from '@/styles/Common/commonStyles'

const Button = ({title, onPress}: {title: string, onPress: () => void}) => {
  return (
    <TouchableOpacity style={commonStyles.buttonContainer}
      onPress={() => onPress()}
    >
      <Text>{title}</Text>
      
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})