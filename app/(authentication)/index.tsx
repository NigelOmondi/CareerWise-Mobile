import { Text, View, StatusBar, KeyboardAvoidingView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import OnBoardingScreen from "./onboardingScreen";
import SignIn from "./signIn";
import SignUp from "./signUp";
import VerifyAccount from "./verifyAccount";
import ForgotPassword from "./forgotPassword";
import Home from "../(inApp)/(tabs)/(home)/home";
import SignUpScreen from "../../app-example/(auth)/sign-up";
import SignInScreen from "../../app-example/(auth)/sign-in";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Redirect } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaded] = useFonts({
    "Prompt-Thin": require("../../assets/fonts/Prompt-Thin.ttf"),
    "Prompt-ExtraLight": require("../../assets/fonts/Prompt-ExtraLight.ttf"),
    "Prompt-Light": require("../../assets/fonts/Prompt-Light.ttf"),
    "Prompt-Regular": require("../../assets/fonts/Prompt-Regular.ttf"),
    "Prompt-Medium": require("../../assets/fonts/Prompt-Medium.ttf"),
    "Prompt-SemiBold": require("../../assets/fonts/Prompt-SemiBold.ttf"),
    "Prompt-Bold": require("../../assets/fonts/Prompt-Bold.ttf"),
    "Prompt-MediumItalic": require("../../assets/fonts/Prompt-MediumItalic.ttf"),
    "Prompt-LightItalic": require("../../assets/fonts/Prompt-LightItalic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <SignedIn>
        <Redirect href="/home" />
      </SignedIn>

      <SignedOut>
        <Redirect href="/onboardingScreen" />
      </SignedOut>
      {/* <Home /> */}
      {/* <SignUpScreen /> */}
      {/* <SignInScreen /> */}

      {/* <VerifyAccount /> */}
      {/* <ForgotPassword /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <OnBoardingScreen /> */}
      {/* <LandingPage /> */}
    </>
  );
}
