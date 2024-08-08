import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from 'react-native';

export default function CoursesLayout() {
    return (
      <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="courses" options={{title: 'Courses'}}/>
      </Stack>
      </>
    );
  }