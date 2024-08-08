import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import CourseDeets from './CourseDeets'
import { enrollCourse, getUserEnrolledCourse } from '@/Services/cms';
import { useUser } from "@clerk/clerk-expo";

const DetailSections = ({ course, enrollCourse, userEnrolledCourse }: { course: any, enrollCourse: any, userEnrolledCourse: any }) => {
  
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  const { user } = useUser();
  //const highlightedCourse = course.course;
  // console.log('The course in details section',course);
  //console.log('The highlighted course in details section',highlightedCourse);
  // console.log('The course Image in details section',highlightedCourse.banner?.url);
  // console.log('The course author in details section',highlightedCourse.author);
  //console.log('The course description in details section',highlightedCourse.description.markdown);

  // const UserEnrollCourse = async () => {
  //   try {
  //     //console.log('Enroll Course arguments in Detail Sections:', course.id, user?.primaryEmailAddress?.emailAddress);
  //     const data = await enrollCourse(course.id, user?.primaryEmailAddress?.emailAddress);
  //     console.log('Course enrolled on Detail Section:', data.createUserEnrolledCourse);
  //     if (data.createUserEnrolledCourse) {
  //       ToastAndroid.show('Course Enrolled Successfully', ToastAndroid.LONG);
  //       GetUserEnrolledCourse();
  //     }
  //   } catch (error) {
  //     console.error('Error during enrollment:', error);
  //   }
  // }

  // const GetUserEnrolledCourse = async (): Promise<any> => {

  //   return userEnrolledCourse(course.id, user?.primaryEmailAddress?.emailAddress).then((data: any) => {

  //     setEnrolledCourses(data.userEnrolledCourses);

  //     //console.log('User Enrolled Course:', data.userEnrolledCourses);

  //     //console.log('User Enrolled Course Length:', data.userEnrolledCourses.length);

  //     //return data.userEnrolledCourses

  //   });
  // }

  // useEffect(() => {

  //   if (user && course) {
  //     GetUserEnrolledCourse();
  //   };

  // }, [course, user]);

  return (
    <View style={{

      marginTop: 10,
      backgroundColor: '#fff',
      padding: 10,
      margin: 10
    }}>
      <Image
        source={{ uri: course?.banner?.url }}
        style={{ width: Dimensions.get('screen').width * 0.90, height: 150, justifyContent: 'center', alignSelf: 'center', }}
      />
      <Text style={{
        fontSize: 22,
        fontFamily: 'Prompt-SemiBold',
        marginVertical: 10,
        textAlign: 'center'
      }}
      >{course?.name}
      </Text>

      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CourseDeets icon={'book-outline'} value={course?.chapters.length + ' Chapters'} />
          <CourseDeets icon={'timer-outline'} value={course?.time} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <CourseDeets icon={'person-circle-outline'} value={'Author ' + course?.author} />
          <CourseDeets icon={'cellular-outline'} value={course?.level} />
        </View>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Prompt-SemiBold' }}>Description</Text>
        <Text style={{ fontFamily: 'Prompt-Regular', color: '#00000095' }}>{course?.description.markdown}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        {userEnrolledCourse.length == 0 ? (
          <TouchableOpacity onPress={enrollCourse}>
            <Text style={{
              fontSize: 13, fontFamily: 'Prompt-SemiBold',
              textAlign: 'center', color: '#fff', padding: 10, backgroundColor: '#2467EC98',
              borderRadius: 5
            }}>Enroll For Free</Text>
          </TouchableOpacity> ) : (
            <TouchableOpacity>
              <Text style={{
              fontSize: 13, fontFamily: 'Prompt-SemiBold',
              textAlign: 'center', color: '#fff', padding: 10, backgroundColor: '#2A6B19',
              borderRadius: 5
            }}>On a Free Plan</Text>
            </TouchableOpacity>
          )
        }

        <TouchableOpacity>
          <Text style={{
            fontSize: 13, fontFamily: 'Prompt-SemiBold',
            textAlign: 'center', color: '#fff', padding: 10, backgroundColor: '#FFA500',
            borderRadius: 5
          }}>Membership $2.99/mon</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default DetailSections

const styles = StyleSheet.create({
})