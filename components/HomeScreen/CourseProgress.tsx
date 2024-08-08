import { FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import SubHeading from '../SubHeading'
import { getAllUserEnrolledCoursesProgress } from '@/Services/cms'
import { useUser } from '@clerk/clerk-expo'
import CourseItem from './CourseItem'
import { useNavigation } from '@react-navigation/native'

const CourseProgress = () => {

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
    }, [,user])

  return (
      <View style={{ paddingStart: 17, marginBottom: 20 }}>
        
        <SubHeading text={'My enrolled courses'} />
        {inprogressCoursesList.length > 0 ? (
          <FlatList
                  data={inprogressCoursesList}
                 
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {navigation.navigate('courseInDetailScreen', {course:item.course})}}>
                       <CourseItem item={item.course} completedChapters={item.completedChapter.length} />
                    </TouchableOpacity>
                   
                  )}
              />) : (
                <Text style={{marginTop: 20}}>No courses enrolled to, Yet.</Text>
              )}
        
      </View>
    )
}

export default CourseProgress

const styles = StyleSheet.create({})