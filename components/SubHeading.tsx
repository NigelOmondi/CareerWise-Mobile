import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SubHeading = ({text}: {text: string}) => {
  return (
    <View>
      <Text style={styles.HeaderTitle}>{text}</Text>
    </View>
  )
}

export default SubHeading

const styles = StyleSheet.create({
    HeaderTitle: {
        fontFamily: 'Prompt-SemiBold',
        fontSize: 24
    }
})