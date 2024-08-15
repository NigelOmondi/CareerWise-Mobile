import React, { useEffect, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { Button, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { Entypo, Fontisto, Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

WebBrowser.maybeCompleteAuthSession();

const useWarmUpBrowser = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  void WebBrowser.warmUpAsync();
  return () => {
    void WebBrowser.coolDownAsync();
  };
};

const SignInWithGoogleOauth = () => {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  useEffect(() => {
    useWarmUpBrowser();
  }, []);

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
       
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };


  return (
    <TouchableOpacity onPress={onPress}>
        <FontAwesome name='google' size={40} color='#0F1641' />
    </TouchableOpacity>
  );
};

export default SignInWithGoogleOauth;