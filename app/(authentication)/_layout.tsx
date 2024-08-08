import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth, SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function AuthenticationLayout() {

    
    return (
        <Stack  screenOptions={{headerShown: false}}>
            
            <Stack.Screen name='index' />
            <Stack.Screen name='onboardingScreen' />
            <Stack.Screen name='welcomeIntroScreen' />
            <Stack.Screen name='signIn' />
            <Stack.Screen name='forgotPassword' />
            <Stack.Screen name='signUp' />
            <Stack.Screen name='verifyAccount' />
          
        </Stack>
    )
}