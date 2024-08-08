import { View, Text, TouchableOpacity, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import DetailSections from '../../../../components/DetailSections';
import ChapterSection from '@/components/ChapterSection';
import { useUser } from "@clerk/clerk-expo";
import { enrollCourse, getUserEnrolledCourse } from '@/Services/cms';
import { CompletedChaptersContext } from '@/Context/CompletedChaptersContext';

const CourseInDetail = () => {
  const navigation: any = useNavigation();

  const completedChaptersContext = useContext(CompletedChaptersContext);

  if (!completedChaptersContext) {
    throw new Error('useContext must be used within a CompletedChaptersProvider');
  }

  const { isChapterComplete, setIsChapterComplete } = completedChaptersContext;

  const { user } = useUser();
  
  const params = useRoute().params as { course: any }; // Replace 'string' with the actual type of 'course'
  const course = params.course;
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  const UserEnrollCourse = async () => {
    try {
      //console.log('Enroll Course arguments in Detail Sections:', course.id, user?.primaryEmailAddress?.emailAddress);
      const data = await enrollCourse(course.id, user?.primaryEmailAddress?.emailAddress);
      console.log('Course enrolled on PARENT:', data.createUserEnrolledCourse);
      if (data.createUserEnrolledCourse) {
        ToastAndroid.show('Course Enrolled Successfully', ToastAndroid.LONG);
        GetUserEnrolledCourse();
      }
    } catch (error) {
      console.error('Error during enrollment:', error);
    }
  }

  useEffect(() => {
    if (isChapterComplete) {
      GetUserEnrolledCourse();
    }
  }, [isChapterComplete]);

  const GetUserEnrolledCourse = async (): Promise<any> => {

    return getUserEnrolledCourse(course.id, user?.primaryEmailAddress?.emailAddress).then((data) => {

      setEnrolledCourses(data?.userEnrolledCourses || []);

      //console.log('User Enrolled Course in PARENT:', data.userEnrolledCourses);

      //console.log('User Enrolled Course Length in PARENT:', data.userEnrolledCourses.length);

      //return data.userEnrolledCourses

    });
  }

  useEffect(() => {

    if (user && course) {
      GetUserEnrolledCourse();
    };

  }, [course, user]);


  return (
    <>

    {/* {course && ( */}
      <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{ flex: 1 }}
    >
       <StatusBar backgroundColor='transparent' barStyle="dark-content" />
      <TouchableOpacity style={{ marginTop: 40, paddingHorizontal: 15 }}
        onPress={() => { navigation.goBack() }}
      >
        <Ionicons name="arrow-back-circle-outline" size={45} color="black" />
      </TouchableOpacity>

      <ScrollView>
      <DetailSections course={course} enrollCourse={UserEnrollCourse} userEnrolledCourse={enrolledCourses}/>

      <ChapterSection chapterList={course.chapters} userEnrolledCourse={enrolledCourses} />
      </ScrollView> 

    </LinearGradient>
    {/* )} */}
    
    </>
  )
}


export default CourseInDetail