import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from 'react-native';

export default function FunLayout() {
    return (
      <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="feed" />
      </Stack>
      </>
    );
  }