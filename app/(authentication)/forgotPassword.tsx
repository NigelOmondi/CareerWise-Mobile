import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'


export default function ForgotPassword() {

  const navigation: any = useNavigation();

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{flex: 1}}
    >
      <StatusBar style='dark' />
      <View style={styles.container}>
        <Text style={styles.headerText}>Reset Password For</Text>
     
        <TextInput style={styles.emailInput}
          placeholder='Email'
          placeholderTextColor='#A1A1A1'
          keyboardType='email-address'
        />

          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
          <Text style={styles.subText}>Remembered your password? <Text style={{color: '#007AFF', fontWeight: '900'}}>Sign in</Text></Text>
        </TouchableOpacity> 
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Prompt-Bold',
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Prompt-Regular',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 20,
    fontFamily: 'Prompt-Regular',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Prompt-SemiBold',
  },
  emailInput: {
    width: '80%',
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#A1A1A1',
    borderRadius: 5,
    paddingLeft: 5,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Prompt-Regular',
  },
  sendButton: {
    backgroundColor: '#FFA500',
    width: '80%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  }
});