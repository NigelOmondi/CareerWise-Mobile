import { StyleSheet, Text, View, StatusBar, Button, ToastAndroid } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();
  const { signOut, sessionId } = useAuth();

  const signOutUser = async () => {
    try {
      console.log('Signing out...');
      
      
      //await signOut();
      router.push('/signIn');
      ToastAndroid.show("User signed out", ToastAndroid.LONG);
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
          <View>
            <Button title="Sign Out" onPress={signOutUser} />
          </View>
        </LinearGradient>
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
