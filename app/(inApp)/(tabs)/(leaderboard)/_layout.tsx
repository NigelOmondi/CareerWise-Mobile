import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from 'react-native';

export default function LeaderBoardLayout() {
    return (
      <>
     
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="leaderBoard" />
      </Stack>
      </>
      
    );
  }