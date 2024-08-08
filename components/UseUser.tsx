import { useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import React from "react";

export default function UseUser() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <Text>Hello, {user.firstName} welcome to Clerk</Text>;
}