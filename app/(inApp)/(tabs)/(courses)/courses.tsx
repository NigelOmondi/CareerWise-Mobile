import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import { LinearGradient } from 'expo-linear-gradient';

import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { getAllUserEnrolledCoursesProgress } from '@/Services/cms';

const Courses = () => {
  const navigation: any = useNavigation();

  const [inprogressCoursesList, setInProgressCoursesList] = useState<any[]>([]);

  const { user } = useUser();

  const GetAllCoursesProgress = () => {
      getAllUserEnrolledCoursesProgress(user?.primaryEmailAddress?.emailAddress).then((data) => {
          //console.log("User enrolled courses progress in CourseProgress.tsx", data.userEnrolledCourses);
          setInProgressCoursesList(data.userEnrolledCourses)
          
      })
  }

  useEffect(()=> {
      GetAllCoursesProgress()
  }, [user])
  return (
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{flex: 1}}
    >
    <View >
    <StatusBar backgroundColor='transparent' barStyle="light-content" />
  
      <LinearGradient colors={['#672BCD', '#341667']} style={{height: 160, padding: 30}}>

       <Text style={styles.coursesHeaderText}>Video Courses</Text>

      </LinearGradient>
     
    </View>
    </LinearGradient>
  )
}

export default Courses

const styles = StyleSheet.create({
  coursesHeaderText: {
    fontFamily: 'Prompt-Bold',
    fontSize: 24, 
    color: '#fff', 
    textAlign: 'center',
    marginTop: 40
  }
})