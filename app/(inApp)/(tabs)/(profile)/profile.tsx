import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import { LinearGradient } from 'expo-linear-gradient';

const Profile = () => {
  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{flex: 1}}
    >
    <View style={commonStyles.basicContainer}>
      <Text> Profile</Text>
    </View>
    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({})