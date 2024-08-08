import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AppIntroSlider from 'react-native-app-intro-slider'
import { onboardingSwiperData } from '../../constants/constants'
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '@/styles/Common/commonStyles'
import { OnBoardingStyles } from '@/styles/OnBoarding/OnBoarding'



export default function welcomeIntroScreen() {
  const navigation: any = useNavigation();

  
    const renderItem = ({item}: {item: onboardingSwiperDataType}) => {
     

    return (
      <View style={commonStyles.container}>
        <View style={{flex: 1, alignItems: 'center'}}>
        <StatusBar backgroundColor='transparent' barStyle="light-content" />
        
        <Image source={item.image} style={commonStyles.slideImage} />
        <Text style={commonStyles.title}>{item.title}</Text>
        <Text style={commonStyles.description}>{item.description}</Text>
         
        </View>

      </View>
    );
  }

  return (
    <>
    <View style={{flex:1, justifyContent: 'center',}}>
     
      <AppIntroSlider 
         renderItem={renderItem}
         data={onboardingSwiperData}
         onDone={() => navigation.navigate('signIn')}
         onSkip={() => navigation.navigate('signIn')}
         renderNextButton={() => 
            <View style={commonStyles.buttonContainer}>
              <Text style={OnBoardingStyles.buttonText}>Next</Text>
            </View>
          }
          renderDoneButton={() => 
            <View style={commonStyles.doneButtonContainer}>
            <Text style={OnBoardingStyles.buttonText}>Done</Text>
            </View>
          }
          showSkipButton={false}
          dotStyle={commonStyles.dotStyle}
          bottomButton={true}
          activeDotStyle={commonStyles.activeDotStyle}
      />
    </View>
    </>
  );
  
}
