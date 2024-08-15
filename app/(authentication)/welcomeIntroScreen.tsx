import { View, Text, Image, StatusBar } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import { onboardingSwiperData } from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "@/styles/Common/commonStyles";
import { OnBoardingStyles } from "@/styles/OnBoarding/OnBoarding";
import LottieView from "lottie-react-native";

export default function welcomeIntroScreen() {
  const navigation: any = useNavigation();

  const animation = useRef<LottieView>(null);

  useEffect(() => {
    //You can control the ref programmatically, rather than using autoPlay
    animation.current?.play();
  }, []);

  const renderItem = ({ item }: { item: onboardingSwiperDataType }) => {
    return (
      <View style={commonStyles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />

          {item.id === 0 ? (
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 350,
                height: 350,
                backgroundColor: "#000",
                marginTop: 40
              }}
              //     // Find more Lottie files at https://lottiefiles.com/featured
              source={item.image}
            />
          ) : (
            <Image source={item.image} style={commonStyles.slideImage} />
          )}
          <Text style={item.id === 0 ? commonStyles.title : commonStyles.centeredTitle}>{item.title}</Text>
          <Text style={item.id === 0 ? commonStyles.description : commonStyles.centeredDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AppIntroSlider
          renderItem={renderItem}
          data={onboardingSwiperData}
          onDone={() => navigation.navigate("signIn")}
          onSkip={() => navigation.navigate("signIn")}
          renderNextButton={() => (
            <View style={commonStyles.buttonContainer}>
              <Text style={OnBoardingStyles.buttonText}>Next</Text>
            </View>
          )}
          renderDoneButton={() => (
            <View style={commonStyles.doneButtonContainer}>
              <Text style={OnBoardingStyles.buttonText}>Done</Text>
            </View>
          )}
          showSkipButton={false}
          dotStyle={commonStyles.dotStyle}
          bottomButton={true}
          activeDotStyle={commonStyles.activeDotStyle}
        />
      </View>
    </>
  );
}
