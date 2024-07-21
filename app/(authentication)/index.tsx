import { Text, View, StatusBar, KeyboardAvoidingView } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import OnBoardingScreen from "./onboardingScreen";
import SignIn from "./signIn";
import SignUp from "./signUp";
import VerifyAccount from "./verifyAccount";
import ForgotPassword from "./forgotPassword";
import Home from "../(inApp)/(tabs)/(home)/home";

SplashScreen.preventAutoHideAsync();

export default function Index() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaded] = useFonts({
    'Prompt-Thin': require('../../assets/fonts/Prompt-Thin.ttf'),
    'Prompt-ExtraLight': require('../../assets/fonts/Prompt-ExtraLight.ttf'),
    'Prompt-Light': require('../../assets/fonts/Prompt-Light.ttf'),
    'Prompt-Regular': require('../../assets/fonts/Prompt-Regular.ttf'),
    'Prompt-Medium': require('../../assets/fonts/Prompt-Medium.ttf'),
    'Prompt-SemiBold': require('../../assets/fonts/Prompt-SemiBold.ttf'),
    'Prompt-Bold': require('../../assets/fonts/Prompt-Bold.ttf'),
    'Prompt-MediumItalic': require('../../assets/fonts/Prompt-MediumItalic.ttf'),
    'Prompt-LightItalic': require('../../assets/fonts/Prompt-LightItalic.ttf'),
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
    {/* <VerifyAccount /> */}
    {/* <ForgotPassword /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      <OnBoardingScreen />
      {/* <LandingPage /> */}
    
    </>
  );
}
 