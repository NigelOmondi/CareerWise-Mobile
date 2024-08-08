import { StyleSheet, Text, ToastAndroid, View, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import Content from '@/components/ChapterContent/Content'
import { useRoute } from '@react-navigation/native'
import ProgressBar from '@/components/ChapterContent/ProgressBar'
import { markCompletedChapter } from '@/Services/cms'
import { useNavigation } from '@react-navigation/native'
import { CompletedChaptersContext } from '@/Context/CompletedChaptersContext'
import { useUser } from "@clerk/clerk-expo";
import { UserPointsContext } from '@/Context/UserPointsContext'
import { storeUserPoints } from '@/Services/storeUserPoints'

const ChapterContentScreen = () => {

    const {user} = useUser();

    const completedChaptersContext = useContext(CompletedChaptersContext);

    if (!completedChaptersContext) {
      throw new Error('useContext must be used within a CompletedChaptersProvider');
    }
  
    const { isChapterComplete, setIsChapterComplete } = completedChaptersContext;

    const userPointsContext = useContext(UserPointsContext);

    const { points, setPoints } = userPointsContext!;
  

    const navigation: any = useNavigation();

    const params = useRoute().params as { content: any, chapterId: any, userCourseRecordId: any };
    //console.log('Content on chapter content screen:', params?.content);
    //console.log('Chapter ID on chapter content screen:', params?.chapterId);
    //console.log('Record ID on chapter content screen:', params?.userCourseRecordId);

    const chapterContent = params?.content;
    //.log('Chapter Content Length:', chapterContent.length);

    useEffect(()=>{
        //console.log("chapter ID:", params?.chapterId);
        //console.log("Record ID:", params?.userCourseRecordId);
        
        
    }, [params]);

    const OnChapterFinish = () => {
        const totalPoints = Number(points)+chapterContent.length*10;
        // console.log("Total points in chapterContentScreen.tsx", totalPoints);
        // setPoints(totalPoints)
        // storeUserPoints(totalPoints);
        markCompletedChapter(params?.chapterId, params?.userCourseRecordId, user?.primaryEmailAddress?.emailAddress, totalPoints).then((data)=>{
   
            if (data) {
                ToastAndroid.show("Congatulations! Course Completed.", ToastAndroid.LONG)
                console.log("Total points if DATA in chapterContentScreen.tsx", totalPoints);
                setPoints(totalPoints)
                storeUserPoints(totalPoints);
                setIsChapterComplete(true);
                navigation.goBack();
            } else {
                ToastAndroid.show("Chapter already marked complete", ToastAndroid.LONG)
                setIsChapterComplete(true);
                navigation.goBack();
            }
            
        })
    
    }

    useEffect(()=> {
       console.log("UseEffect Points on chapterContentScreen.tsx", points);
       
    }, [,user])
    
    
    return (
       
            <View>
                 <StatusBar backgroundColor='transparent' barStyle="dark-content" />
                <Content content={chapterContent} OnChapterFinish={()=>{OnChapterFinish()}} />
            </View>
        
      
    )
}

export default ChapterContentScreen

const styles = StyleSheet.create({})