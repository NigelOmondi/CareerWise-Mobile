import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { EnrolledCoursesProvider } from '@/Context/EnrolledCoursesContext';

export default function TabLayout() {
  return (
    <>
     <EnrolledCoursesProvider>
          
     
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)" />
    </Stack>
    </EnrolledCoursesProvider>
    </>
  );
}
