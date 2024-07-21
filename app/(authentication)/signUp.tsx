import { 
  View, Text, StatusBar, ScrollView, 
  Image, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, 
  ActivityIndicator,
  Touchable} from 'react-native'
import React, {useState} from 'react'
import { Entypo, Fontisto, Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { commonStyles } from '@/styles/Common/commonStyles'
import { useNavigation } from '@react-navigation/native'


const signUp = () => {

  const navigation: any = useNavigation();
  

  interface UserInfo {
    username: string;
    email: string;
    password: string;
  }

  interface Error {
    username: string;
    email: string;
    password: string;
  }
  
  const [userInfo, setUserInfo] = useState<UserInfo>({  username: '', email: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [buttonSpinner, setButtonSpinner] = useState(false)
  const [required, setRequired] = useState(false)
  const [error, setError] = useState<Error>({username: '', email: '', password: ''})

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
  // console.log(errorMessage);
};

const handleUsernameChange = (username: string) => {
  setUserInfo({ ...userInfo, username });
  if (username.trim() === '') {
    setError({ ...error, username: 'Name cannot be blank' });
  } else {
    setError({ ...error, username: '' });
  }
};

const handleSignUp = () => {
  navigation.navigate('verifyAccount')
}

  return (

    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{flex: 1}}
    >
        <ScrollView>
          <StatusBar backgroundColor='transparent' barStyle="dark-content" />
            <Image 
              source={require('@/assets/images/signup.png')}
              style={commonStyles.signInImage}
            />
            <Text style={commonStyles.welcomeText}>Let's get you started</Text>
            <Text style={commonStyles.loginText}>Create an account</Text>
          
            <View style={commonStyles.inputContainer}>

              <View>
                
              <TextInput
                  style={[commonStyles.input, {marginBottom: 15}] }
                  keyboardType='default'
                  value={userInfo.username}
                  placeholder='Name'
                  placeholderTextColor='#A1A1A1'
                  onChangeText={handleUsernameChange}
                  onBlur={() => handleUsernameChange(userInfo.username)}

                />
                <SimpleLineIcons
                  name='user' 
                  size={20} 
                  color='#A1A1A1' 
                  style={commonStyles.usernameIconStyles} 
                />
                {error.username && (
                  <View style={commonStyles.signUpUsernameErrorContainer}>
                    <Entypo
                      name='cross' 
                      size={20} 
                      color='red' 
                    />
                    <Text style={commonStyles.errorText}>{error.username}</Text>
                  </View>
                )}

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
                  style={commonStyles.signUpEmailIconStyles} 
                />
                {error.email && (
                  <View style={commonStyles.signUpEmailErrorContainer}>
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
                    style={commonStyles.passwordLockStyles}
                  />
                </View>

                {error.password ? (
                  <View style={[commonStyles.signUpPasswordErrorContainer]}>
                    <Entypo
                      name='cross' 
                      size={20} 
                      color='red'
                    />
                    <Text style={commonStyles.errorText}>{error.password}</Text>
                  </View>
                ) : null}

                
              </View>

                <TouchableOpacity 
                  style={commonStyles.signInButtonContainer}
                  onPress={handleSignUp}
                >
                  {buttonSpinner ? (
                    <ActivityIndicator size='small' color='#fff' />
                  ) : (
                    <Text style={commonStyles.signInTextStyle}>Sign Up</Text>
                  )}
                 
                </TouchableOpacity>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10}}>
                  <TouchableOpacity>
                    <FontAwesome name='google' size={40} color='#0F1641' />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <FontAwesome name='github' size={40} color='#0F1641' />
                  </TouchableOpacity>
                  
                  
                </View>

                <View style={[commonStyles.signUpRedirect, {marginBottom: 20}]}>
                  <Text style={{fontSize: 18, fontFamily: 'Prompt-Regular'}}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
                    <Text style={{fontSize: 18, fontFamily: 'Prompt-Bold', color: '#FFA500', marginLeft: 5}}>Sign In</Text>

                  </TouchableOpacity>

                </View>


            </View>
           
    
        </ScrollView>
       
    </LinearGradient>
   
  )
}

export default signUp