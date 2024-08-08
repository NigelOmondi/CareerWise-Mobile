import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function ProfileLayout() {
    return (
      <>
      
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="profile" options={{title: 'Profile'}}/>
      </Stack>
      </>
    );
}