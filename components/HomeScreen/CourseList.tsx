import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '@/Services/cms';
import SubHeading from '../SubHeading';
import { Ionicons } from '@expo/vector-icons';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';

const CourseList = ({ level }: { level: string }) => {
    const navigation: any = useNavigation();

    const [courseList, setCourseList] = useState<any>([]);

    const getCourses = async () => {
        const courses = await getCourseList(level);
        //console.log(courses);
        
        setCourseList(courses);


    }

    useEffect(() => {
        getCourses()
    }, []);

    return (
        <View style={{ paddingStart: 17, marginBottom: 20 }}>

            <View style={{marginBottom: 20}}>
              <SubHeading text={level+ ' courses'} />
            </View>
            

            <FlatList
                data={courseList}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {navigation.navigate('courseInDetailScreen', {course:item})}}>
                     <CourseItem item={item} />
                  </TouchableOpacity>
                 
                )}
            />
        </View>
    )
}

export default CourseList

const styles = StyleSheet.create({
    HeaderTitle: {
        fontFamily: 'Prompt-SemiBold',
        fontSize: 24
    }
})