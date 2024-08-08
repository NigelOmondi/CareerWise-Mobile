import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { enrollCourse } from '@/Services/cms';
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from '@react-navigation/native';
import { CompletedChaptersContext } from '@/Context/CompletedChaptersContext';


const ChapterSection = ({ chapterList, userEnrolledCourse }:
    { chapterList: any, userEnrolledCourse: any }) => {

        const completedChaptersContext = useContext(CompletedChaptersContext);

        if (!completedChaptersContext) {
            throw new Error('useContext must be used within a CompletedChaptersProvider');
        }

        const { isChapterComplete, setIsChapterComplete } = completedChaptersContext;

    const navigation: any = useNavigation();


    useEffect(() => {
        //console.log('User Enrolled Course in Chapter Section:', userEnrolledCourse);
        //console.log("List of chapters in chapter section:", chapterList);
        //console.log("userEnrolledCourse[0]?.id", userEnrolledCourse[0]?.id);


    }, [userEnrolledCourse]);

    //console.log("Completed chapters", userEnrolledCourse[0]?.completedChapter);

    const CheckIsChapterComplete = (chapterId: any) => {
        if (userEnrolledCourse[0]?.completedChapter.length <= 0) {
            return false;
        }
        const resp = userEnrolledCourse[0]?.completedChapter?.find((item: any) => item.chapterId === chapterId);
        return resp;
    }


    const OnChapterPress = async (chapter: any) => {
        if (userEnrolledCourse.length == 0) {
            ToastAndroid.show('Please, enroll first', ToastAndroid.LONG);
            return;
        } else {
            setIsChapterComplete(false)
            //console.log('Chapter RESP:', chapter);
            //console.log("Chapter ID in Chapter Section:", chapter.id);
            //.log("Chapter title:", chapter.title);

            navigation.navigate('chapterContentScreen', {
                content: chapter.content,
                chapterId: chapter.id,
                userCourseRecordId: userEnrolledCourse[0]?.id
            });
        }
    };


    return (
        <View style={{ backgroundColor: "#fff", margin: 10 }}>
            <Text style={{
                fontSize: 24,
                fontFamily: 'Prompt-SemiBold',
                margin: 17,
                color: '#000000'
            }}>Chapters</Text>
            {chapterList.map((item: any, index: number) => (
                <TouchableOpacity key={index} style={[CheckIsChapterComplete(item.id) ? styles.completedChapter : styles.incompleteChapter]}
                    onPress={() => OnChapterPress(item)}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        {CheckIsChapterComplete(item.id) ?
                            <Ionicons name="checkmark-circle" size={30} color="#2A6B19" /> :
                            <Text style={{ color: '#00000050', fontFamily: 'Prompt-SemiBold', fontSize: 24 }}>{index + 1}</Text>
                        }

                        {CheckIsChapterComplete(item.id) ?
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'Prompt-Regular',
                                marginVertical: 10,
                                color: '#00000090'
                            }}
                            >{item.title}
                            </Text> :
                            <Text style={{ color: '#00000050', fontFamily: 'Prompt-SemiBold', fontSize: 20 }}>{item.title}</Text>
                        }


                    </View>

                    {userEnrolledCourse.length == 0 ? (
                        <View>
                            <Ionicons name="lock-closed" size={30} color="#00000030" />
                        </View>
                    ) : (
                        <View>
                            <Ionicons name="play" size={30} color={CheckIsChapterComplete(item.id) ? '#2A6B19' : '00000030'} />
                        </View>
                    )}





                </TouchableOpacity>
            ))}
        </View>

    )
}

export default ChapterSection

const styles = StyleSheet.create({
    incompleteChapter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 17,
        marginTop: 0,
        borderWidth: 1,
        borderColor: '#00000010',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#00000010',
    },
    completedChapter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 17,
        marginTop: 0,

        color: '#fff',
        borderColor: 'none',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#91EA7A90',
    }
})