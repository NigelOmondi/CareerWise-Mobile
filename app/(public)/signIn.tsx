import { 
  View, Text, StatusBar, ScrollView, 
  Image, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, 
  ActivityIndicator,
  Pressable,
  Touchable,
  } from 'react-native'
import React, {useState} from 'react'
import { Entypo, Fontisto, Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { commonStyles } from '@/styles/Common/commonStyles'
import { useNavigation } from '@react-navigation/native'
import { Link, useRouter } from 'expo-router'
import {  useSignIn } from "@clerk/clerk-expo";
import SignInWithGoogleOauth from '@/components/SignInWithGoogleOauth'


const signIn = () => {

  const navigation: any = useNavigation();
  const router: any = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();
  

  interface UserInfo {
    email: string;
    password: string;
  }

  interface Error {
    email: string;
    password: string;
  }
  
  const [userInfo, setUserInfo] = useState<UserInfo>({ email: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [buttonSpinner, setButtonSpinner] = useState(false)
  const [required, setRequired] = useState(false)
  const [error, setError] = useState<Error>({email: '', password: ''})
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordUpperCase = /(?=.*[A-Z])/;
    const passwordLowerCase = /(?=.*[a-z])/;
    const passwordLength = /(?=.{8,})/;

    let errorMessage = '';

    if (!passwordSpecialCharacter.test(password)) {
      errorMessage = 'Must have at lease one special character !@#$&*';
    } else if (!passwordOneNumber.test(password)) {
      errorMessage = 'Must have at least one number';
    } else if (!passwordUpperCase.test(password)) {
      errorMessage = 'Must have at least one uppercase letter';
    } else if (!passwordLowerCase.test(password)) {
      errorMessage = 'Must have at least one lowercase letter';
    } else if (!passwordLength.test(password)) {
      errorMessage = 'Must have at least 8 characters';
    }

    if (password && errorMessage) {
      setError({...error, password: errorMessage});
      // console.error(errorMessage);
    } else {
      setError({...error, password: ''});
     
    }

    setUserInfo({...userInfo, password: value});

}

const handlePasswordBlur = () => {
  const { password } = userInfo;
  handlePasswordValidation(password);
}

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const handleEmailChange = (email: string) => {
  setUserInfo({ ...userInfo, email });
  if (error.email) {
    validateEmail(email);
  }
};

const validateEmail = (email: string) => {
  let errorMessage = '';

  if (!emailPattern.test(email)) {
    errorMessage = 'Invalid email address';
  }

  if (!email) {
    errorMessage = 'Email is required';
  }

  setError({ ...error, email: errorMessage });
};


const handleSignIn = () => {
  setButtonSpinner(true);
  // console.log('Signing in...');
  router.push('home');
  
  
  setButtonSpinner(false);
  
}

const onSignInPress = React.useCallback(async () => {
  if (!isLoaded) {
    return;
  }

  setIsLoading(true)
  try {
    const { email, password } = userInfo;
    const signInAttempt = await signIn.create({
      identifier: email,
      password,
    });

    if (signInAttempt.status === 'complete') {
      console.log('Sign in successful');
      
      await setActive({ session: signInAttempt.createdSessionId });
      router.replace('home');
    } else {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(signInAttempt, null, 2));
      setIsLoading(false)
    }
  } catch (err: any) {
    console.error(JSON.stringify(err, null, 2));
  }
}, [isLoaded, userInfo]);


  return (

    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{flex: 1}}
    >
        <ScrollView>
          <StatusBar backgroundColor='transparent' barStyle="dark-content" />
            <Image 
              source={require('@/assets/images/log-in.png')}
              style={commonStyles.signInImage}
            />
            <Text style={commonStyles.welcomeText}>Welcome Back!</Text>
            <Text style={commonStyles.loginText}>Login to your CareerWise Account</Text>
          
            <View style={commonStyles.inputContainer}>

              <View>
                <TextInput
                  style={commonStyles.input}
                  keyboardType='email-address'
                  value={userInfo.email}
                  placeholder='Email'
                  placeholderTextColor='#A1A1A1'
                  onChangeText={handleEmailChange}
                  onBlur={() => validateEmail(userInfo.email)}

                />
                <Fontisto 
                  name='email' 
                  size={20} 
                  color='#A1A1A1' 
                  style={commonStyles.signInEmailIconStyles} 
                />
                {error.email && (
                  <View style={commonStyles.signInEmailErrorContainer}>
                    <Entypo
                      name='cross' 
                      size={20} 
                      color='red' 
                    />
                    <Text style={commonStyles.errorText}>{error.email}</Text>
                  </View>
                )}
                <View style={{marginTop: 15}}>
                <TextInput
                  style={commonStyles.input}
                  keyboardType='default'
                  secureTextEntry={!isPasswordVisible}
                  value={userInfo.password}
                  placeholder='Password'
                  placeholderTextColor='#A1A1A1'
                  onChangeText={handlePasswordValidation}
                  onBlur={handlePasswordBlur}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={commonStyles.passwordEyeIcon}>
                  {isPasswordVisible ? (
                    <Ionicons name='eye-off-outline' size={24} color='#747474' />
                  ) : (
                    <Ionicons name='eye-outline' size={24} color='#747474' />
                  )}
                  </TouchableOpacity>

                  <SimpleLineIcons 
                    name='lock' 
                    size={20} 
                    color='#A1A1A1' 
                    style={commonStyles.signInPasswordLockStyles}
                  />
                </View>

                {error.password ? (
                  <View style={[commonStyles.signInPasswordErrorContainer]}>
                    <Entypo
                      name='cross' 
                      size={20} 
                      color='red'
                    />
                    <Text style={commonStyles.errorText}>{error.password}</Text>
                  </View>
                ) : null}

                
              </View>
                <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
                  <Text style={commonStyles.forgotPasswordSection}>Forgot Password?</Text>
                </TouchableOpacity>

               
                <TouchableOpacity
                  style={commonStyles.signInButtonContainer}
                  onPress={onSignInPress}
                >
                  {isLoading ? (
                    <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                      <ActivityIndicator size='large' color='#fff' />
                       <Text style={commonStyles.signInTextStyle}> Signing In...</Text>
                    </View>
                   
                  ) : (
                    <Text style={commonStyles.signInTextStyle}>Sign In</Text>
                  )}
                 
                </TouchableOpacity>
              
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10}}>

                <SignInWithGoogleOauth />

                  <TouchableOpacity>
                    <FontAwesome name='github' size={40} color='#0F1641' />
                  </TouchableOpacity>
                  
                </View>

                

                <View style={commonStyles.signUpRedirect}>
                  <Text style={{fontSize: 18, fontFamily: 'Prompt-Regular'}}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                    <Text style={{fontSize: 18, fontFamily: 'Prompt-Bold', color: '#FFA500', marginLeft: 5}}>Sign Up</Text>

                  </TouchableOpacity>

                </View>

            </View>
           
        </ScrollView>

    </LinearGradient>
   
  )
}

export default signIn