import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function JobsLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="jobsHome" />
        <Stack.Screen name="[id]" />
        <Stack.Screen name="(search)" />
      </Stack>
    </>
  );
}
