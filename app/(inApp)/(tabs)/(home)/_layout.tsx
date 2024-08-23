import { Stack } from "expo-router";
import React from "react";


export default function HomeLayout() {
  return (
    <>
   
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="home"  />
      <Stack.Screen name="courseInDetailScreen" />
      <Stack.Screen name="chapterContentScreen" />
      <Stack.Screen name="webLinking" />
   
      
    </Stack>
    </>
  );
}