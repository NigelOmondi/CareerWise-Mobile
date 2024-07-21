import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import { LinearGradient } from 'expo-linear-gradient';

const Search = () => {
  
  return (
    <LinearGradient
    colors={['#E5ECF9', '#F6F7F9']}
    style={{flex: 1}}
  >
    <View style={commonStyles.basicContainer}>
      <Text>Search</Text>
    </View>
    </LinearGradient>
  )
}

export default Search

const styles = StyleSheet.create({})