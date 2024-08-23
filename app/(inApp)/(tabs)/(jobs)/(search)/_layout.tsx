import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from 'react-native';

export default function SearchLayout() {
    return (
      <>
     
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="[search]" />
       
      </Stack>
      </>
      
    );
  }