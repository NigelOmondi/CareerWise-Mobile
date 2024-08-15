import { StyleSheet, Text, View, StatusBar, Button, ToastAndroid } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const JobsHomeScreen = () => {

  const { signOut, sessionId } = useAuth();

  const { user } = useUser()

  const router = useRouter()
 
  const signOutUser = () => {

    try {
      console.log('Signing out...');
      signOut();
      router.push('/onboardingScreen');
      ToastAndroid.show(`${user?.fullName} signed out`, ToastAndroid.LONG);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{ flex: 1 }}
    >
      <View>
        <StatusBar backgroundColor='transparent' barStyle="light-content" />
        <LinearGradient colors={['#672BCD', '#341667']} style={{ height: 160, padding: 30 }}>
          <Text style={styles.profileHeaderText}>Available Jobs</Text>
          
        </LinearGradient>
        <Text>Ad</Text>
        <BannerAd 
          unitId={TestIds.BANNER}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            networkExtras: {
              collapsible: "bottom",
            },
          }}
        />

        <View style={{alignSelf: 'center', marginTop: 250}}>
        <Text style={{fontFamily: 'Prompt-Bold', fontSize: 30, textAlign: 'center'}}>Job Listings Coming Soon</Text>
      </View>

      </View>
    </LinearGradient>
  )
}

export default JobsHomeScreen

const styles = StyleSheet.create({
  profileHeaderText: {
    fontFamily: 'Prompt-Bold',
    fontSize: 24, 
    color: '#fff', 
    textAlign: 'center',
    marginTop: 40
  }
})
