import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Slot, Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { EnrolledCoursesProvider } from "@/Context/EnrolledCoursesContext";
import { CompletedChaptersProvider } from "@/Context/CompletedChaptersContext";
import { UserPointsProvider } from "@/Context/UserPointsContext";
import { getUserPoints } from "@/Services/storeUserPoints";
import { useAuth } from "@clerk/clerk-react";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {

  
 

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <CompletedChaptersProvider>
          <UserPointsProvider>
            
            <Slot />
            
          </UserPointsProvider>
        </CompletedChaptersProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
