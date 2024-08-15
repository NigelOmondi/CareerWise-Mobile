import { StyleSheet, Text, View, StatusBar, Button, ToastAndroid, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';


const Profile = () => {

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
          <Text style={styles.profileHeaderText}>My Profile</Text>
          
         
        </LinearGradient>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 10, bottom: -470 }}>
         
          <TouchableOpacity onPress={()=>{router.push("/leaderBoard")}}>
            <Text style={{
              fontSize: 13, fontFamily: 'Prompt-SemiBold',
              textAlign: 'center', color: '#fff', padding: 10, backgroundColor: '#2467EC98',
              borderRadius: 5
            }}>See how I rank Overall</Text>
          </TouchableOpacity> 
        

        <TouchableOpacity onPress={signOutUser}>
          <Text style={{
            fontSize: 13, fontFamily: 'Prompt-SemiBold',
            textAlign: 'center', color: '#fff', padding: 10, backgroundColor: '#FFA500',
            borderRadius: 5
          }}>Sign Out</Text>
        </TouchableOpacity>
      </View>

        {/* <View style={{alignSelf: 'center', marginTop: 200}}>
        <Text style={{fontFamily: 'Prompt-Bold', fontSize: 30}}>Profile Info Here</Text>
      </View> */}

      </View>
    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({
  profileHeaderText: {
    fontFamily: 'Prompt-Bold',
    fontSize: 24, 
    color: '#fff', 
    textAlign: 'center',
    marginTop: 40
  }
})
