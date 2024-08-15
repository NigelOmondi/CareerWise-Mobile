import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import { useNavigation } from '@react-navigation/native'
import Button from '@/components/button';
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";


export default function VerifyAccount() {

  const navigation: any = useNavigation();

  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();

  const [code, setCode] = useState(new Array(6).fill(''));
  const inputs = useRef<any>([...Array(6)].map(() => React.createRef()));

  const handleInput = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      (inputs.current[index + 1].current as any).focus();
    }

    if (value === '' && index > 0) {
      (inputs.current[index - 1].current as any).focus();
    }
  }

  const handleSubmit = () => {
    const verificationCode = code.join('');
    console.log(verificationCode);
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code.join(''),
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/home');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const {width} = Dimensions.get('window')

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Verification Code
      </Text>
      <Text style={styles.subText}>
        We have sent a verification code to your email address.
      </Text>
      <Text style={styles.subText}>
        Please enter the code below.
      </Text>
      <View style={styles.inputContainer}>
        {code.map((_, index) => (
            <TextInput key={index} style={styles.inputBox}
              ref={inputs.current[index]}
              value={code[index]}
              onChangeText={(value) => handleInput(index, value)}
              keyboardType='number-pad'
              maxLength={1}
              autoFocus={index === 0}
              returnKeyType='done'
            />
          
        ))}

      </View>
      <View>
        <TouchableOpacity style={[styles.verifyButton, {width: width * 1 - 130}]}
          onPress={onPressVerify}
        >
          <Text style={commonStyles.signInTextStyle}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('signIn')}
        >
          <Text style={{fontSize: 20, fontFamily: 'Prompt-SemiBold', textAlign: 'center'}}>Back to <Text style={{color: '#007AFF'}}>Sign in</Text></Text>
        </TouchableOpacity>
       
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Prompt-SemiBold',
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Prompt-Regular',
    textAlign: 'center',
    color: '#7C7C7C',
    marginHorizontal: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7C7C7C',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Prompt-Regular',
    marginHorizontal: 16,
    marginTop: 20,
  },
  verifyButton: {
    backgroundColor: '#FFA500',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});