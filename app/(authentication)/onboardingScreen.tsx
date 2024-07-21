import { Text, View, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { OnBoardingStyles } from '@/styles/OnBoarding/OnBoarding'
import { useNavigation } from '@react-navigation/native'
import { Link } from 'expo-router'



const OnBoardingScreen = () => {

 const navigation: any = useNavigation()

  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{flex: 1}}
    >
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <StatusBar backgroundColor='transparent' barStyle="dark-content" />
      <View style={OnBoardingStyles.firstContainer}>
        <View>
          <Image source={require('@/assets/images/school.png')}  style={OnBoardingStyles.logo}/>
          {/* <Image source={require('@/assets/images/round.png')} style={OnBoardingStyles.dot} /> */}
        </View>
         
        <View style={OnBoardingStyles.titleWrapper}>
          <Image source={require('@/assets/images/trophy.png')}  style={OnBoardingStyles.titleTextShape1}/>
          <Text style={OnBoardingStyles.titleText}>
            Start Learning With
          </Text>
           <Image source={require('@/assets/images/trophey.png')}  style={OnBoardingStyles.titleTextShape2}/>
        </View>

        <View>
          {/* <Image source={require('../../assets/images/trophey.png')}  style={OnBoardingStyles.titleTextShape3}/> */}
          <Text style={OnBoardingStyles.titleText}>CareerWise</Text>
        </View>

        <View style={OnBoardingStyles.dscpWrapper}>
          <Text style={OnBoardingStyles.dscpText}>
            Explore a variety of Interactive Lessons
          </Text>
          <Text style={OnBoardingStyles.dscpText}>
            Videos, Quizzes and Assignments.
          </Text>
        </View>

        
          <TouchableOpacity style={OnBoardingStyles.buttonWrapper}
                  onPress={() => navigation.navigate('welcomeIntroScreen')}
          >
          
            <Text style={OnBoardingStyles.myButtonText}>
              Get Started
            </Text>
          </TouchableOpacity>

      </View>
     

    </View>
    </LinearGradient>
  )
}

export default OnBoardingScreen

