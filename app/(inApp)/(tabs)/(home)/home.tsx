import { View, Text, TouchableOpacity, StyleSheet, Button,ScrollView } from 'react-native'
import React, {useRef, useEffect, useContext, useState } from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { StatusBar } from 'expo-status-bar';
import { StatusBar } from 'react-native';
import Header from '@/components/HomeScreen/Header';
import CourseList from '@/components/HomeScreen/CourseList';
import { useUser } from "@clerk/clerk-expo";
import { createNewUser, getUserDetail } from '@/Services/cms';
import { UserPointsContext } from '@/Context/UserPointsContext';
import CourseProgress from '@/components/HomeScreen/CourseProgress';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = () => {
  const navigation: any = useNavigation();

  const animation = useRef<LottieView>(null);

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }


  const userPointsContext = useContext(UserPointsContext);

  const { points, setPoints } = userPointsContext!;

 

  useEffect(() => {
    createUser();
  }, [user]);

  const createUser = async () => {
    if (user) {
      createNewUser(user.fullName, user.emailAddresses[0].emailAddress, points, user.imageUrl).then((res: any) => {
        //console.log('User created successfully on home.tsx', res);
       
        if (res) {
          GetUser();
        }
        
      });
    }
  }

  const GetUser = () => {
    getUserDetail(user.emailAddresses[0].emailAddress).then((res: any) => {
      //console.log('User details now only returns {"userDetail": {"point": 10}}:', res);
      //console.log("res on home.tsx", res);
      
      if (res) {
        //setPoints();
        //console.log('User Points returned from getUserDetail API on home.tsx:', res.userDetail.point);
        //console.log("Context Points now", points);
        
        
      }
    });
  }

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);
  return (
    // <View style={styles.animationContainer}>
    //   <LottieView
    //     autoPlay
    //     ref={animation}
    //     style={{
    //       width: 200,
    //       height: 200,
    //       backgroundColor: '#fff',
    //     }}
    //     // Find more Lottie files at https://lottiefiles.com/featured
    //     source={require('@/assets/images/reading-robot-animation.json')}
    //   />
    //   <View style={styles.buttonContainer}>
    //     <Button
    //       title="Restart Animation"
    //       onPress={() => {
    //         animation.current?.reset();
    //         animation.current?.play();
    //       }}
    //     />
    //   </View>
    // </View>
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{flex: 1}}
    >
      <View>
      <StatusBar backgroundColor='transparent' barStyle="light-content" />
        
        
          <Header />

          <ScrollView style={{marginBottom: 190}}>
            <CourseProgress />
            <CourseList level={'basic'} />
            <CourseList level={'intermediate'} />
            <CourseList level={'advanced'} />
          </ScrollView>

      </View>
      
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});