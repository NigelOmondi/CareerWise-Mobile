import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Touchable,
} from "react-native";
import React, { useState } from "react";
import {
  Entypo,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { commonStyles } from "@/styles/Common/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const signUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const navigation: any = useNavigation();

  const router = useRouter();

  interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  interface Error {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [required, setRequired] = useState(false);
  const [error, setError] = useState<Error>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [pendingVerification, setPendingVerification] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordUpperCase = /(?=.*[A-Z])/;
    const passwordLowerCase = /(?=.*[a-z])/;
    const passwordLength = /(?=.{8,})/;

    let errorMessage = "";

    if (!passwordSpecialCharacter.test(password)) {
      errorMessage = "Must have at lease one special character $ @ # ! & *";
    } else if (!passwordOneNumber.test(password)) {
      errorMessage = "Must have at least one number";
    } else if (!passwordUpperCase.test(password)) {
      errorMessage = "Must have at least one uppercase letter";
    } else if (!passwordLowerCase.test(password)) {
      errorMessage = "Must have at least one lowercase letter";
    } else if (!passwordLength.test(password)) {
      errorMessage = "Must have at least 8 characters";
    }

    if (password && errorMessage) {
      setError({ ...error, password: errorMessage });
      // console.error(errorMessage);
    } else {
      setError({ ...error, password: "" });
    }

    setUserInfo({ ...userInfo, password: value });
    setPassword(value);
  };

  const handlePasswordBlur = () => {
    const { password } = userInfo;
    handlePasswordValidation(password);
  };

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleEmailChange = (email: string) => {
    setUserInfo({ ...userInfo, email });
    setEmailAddress(email);
    if (error.email) {
      validateEmail(email);
    }
  };

  const validateEmail = (email: string) => {
    let errorMessage = "";

    if (!emailPattern.test(email)) {
      errorMessage = "Invalid email address";
    }

    if (!email) {
      errorMessage = "Email is required";
    }

    setError({ ...error, email: errorMessage });
    // console.log(errorMessage);
  };

  const handleFirstNameChange = (firstName: string) => {
    setUserInfo({ ...userInfo, firstName });
    setFirstName(firstName);
    if (firstName.trim() === "") {
      setError({ ...error, firstName: "First name is blank" });
    } else {
      setError({ ...error, firstName: "" });
    }
  };

  const handleLastNameChange = (lastName: string) => {
    setUserInfo({ ...userInfo, lastName });
    setLastName(lastName);
    if (lastName.trim() === "") {
      setError({ ...error, lastName: "Last name is blank" });
    } else {
      setError({ ...error, lastName: "" });
    }
  };

  const handleSignUp = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      //console.log('User info before registration',userInfo);
      console.log(firstName, lastName, emailAddress, password);

      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);

      //router.push('verifyAccount')
      navigation.navigate("verifyAccount");
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <Image
          source={require("@/assets/images/signup.png")}
          style={commonStyles.signInImage}
        />
        <Text style={commonStyles.welcomeText}>Let's get you started</Text>
        <Text style={commonStyles.loginText}>Create an account</Text>

        <View style={commonStyles.inputContainer}>
          <View>
            <View style={{ flexDirection: "row", justifyContent: 'space-around', marginHorizontal: 16, gap: 20 }}>
            
                <TextInput
                  style={commonStyles.nameInput}
                  keyboardType="default"
                  value={userInfo.firstName}
                  placeholder="First Name"
                  placeholderTextColor="#A1A1A1"
                  onChangeText={handleFirstNameChange}
                  onBlur={() => handleFirstNameChange(userInfo.firstName)}
                />
                

                {error.firstName && (
                  <View style={commonStyles.signUpFirstNameErrorContainer}>
                    <Entypo name="cross" size={20} color="red" />
                    <Text style={commonStyles.firstNameErrorText}>{error.firstName}</Text>
                  </View>
                )}
      

              
              <TextInput
                  style={commonStyles.nameInput}
                  keyboardType="default"
                  value={userInfo.lastName}
                  placeholder="Last Name"
                  placeholderTextColor="#A1A1A1"
                  onChangeText={handleLastNameChange}
                  onBlur={() => handleLastNameChange(userInfo.lastName)}
                />

                {error.lastName && (
                  <View style={commonStyles.signUpLastNameErrorContainer}>
                    <Entypo name="cross" size={20} color="red" />
                    <Text style={commonStyles.lastNameErrorText}>{error.lastName}</Text>
                  </View>
                )}
              
            </View>

            <TextInput
              style={commonStyles.input}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="Email"
              placeholderTextColor="#A1A1A1"
              onChangeText={handleEmailChange}
              onBlur={() => validateEmail(userInfo.email)}
            />
            <Fontisto
              name="email"
              size={20}
              color="#A1A1A1"
              style={commonStyles.signUpEmailIconStyles}
            />
            {error.email && (
              <View style={commonStyles.signUpEmailErrorContainer}>
                <Entypo name="cross" size={18} color="red" />
                <Text style={commonStyles.errorText}>{error.email}</Text>
              </View>
            )}
            <View style={{ marginTop: 15 }}>
              <TextInput
                style={commonStyles.input}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                value={userInfo.password}
                placeholder="Password"
                placeholderTextColor="#A1A1A1"
                onChangeText={handlePasswordValidation}
                onBlur={handlePasswordBlur}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={commonStyles.passwordEyeIcon}
              >
                {isPasswordVisible ? (
                  <Ionicons name="eye-off-outline" size={24} color="#747474" />
                ) : (
                  <Ionicons name="eye-outline" size={24} color="#747474" />
                )}
              </TouchableOpacity>

              <SimpleLineIcons
                name="lock"
                size={20}
                color="#A1A1A1"
                style={commonStyles.signUpPasswordLockStyles}
              />
            </View>

            {error.password ? (
              <View style={[commonStyles.signUpPasswordErrorContainer]}>
                <Entypo name="cross" size={18} color="red" />
                <Text style={commonStyles.errorText}>{error.password}</Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            style={commonStyles.signInButtonContainer}
            onPress={handleSignUp}
          >
            {buttonSpinner ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={commonStyles.signInTextStyle}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <TouchableOpacity>
              <FontAwesome name="google" size={40} color="#0F1641" />
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome name="github" size={40} color="#0F1641" />
            </TouchableOpacity>
          </View>

          <View style={[commonStyles.signUpRedirect, { marginBottom: 20 }]}>
            <Text style={{ fontSize: 18, fontFamily: "Prompt-Regular" }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Prompt-Bold",
                  color: "#FFA500",
                  marginLeft: 5,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default signUp;
