import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const CourseDeets = ({icon , value}: {icon: string, value: any}) => {
  return (
    <View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 7 }}>
        <Ionicons name={icon as any} size={24} color='#000' />
        <Text>{value}</Text>
    </View>
</View>
  )
}

export default CourseDeets

const styles = StyleSheet.create({})