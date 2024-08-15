import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { commonStyles } from "@/styles/Common/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { getAllUserEnrolledCoursesProgress } from "@/Services/cms";
import { Video, ResizeMode } from "expo-av";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import ExpoWebsite from "@/components/WebViewComponents/ExpoWebsite";
import CodexYoutubeVideo from "@/Services/YoutubeServices/CodexYoutubeVid";
import JoelSunnyVideo from "@/Services/YoutubeServices/DeveloperTips/TechWithTim";

import TraversyMediaVideo from "@/Services/YoutubeServices/DeveloperTips/TraversyMedia";
import DennisIvyVideo from "@/Services/YoutubeServices/Frontend/DennisIvy";
import BroCodeVideo from "@/Services/YoutubeServices/Frontend/BroCode";
import DotnetSeriesOneVideo from "@/Services/YoutubeServices/Backend/dotnetYoutube/aspSeriesIntro";
import DotnetSeriesTwoVideo from "@/Services/YoutubeServices/Backend/dotnetYoutube/dotnetSeriesTwo";
import ReactNativeIntroVideo from "@/Services/YoutubeServices/MobileApp/Fireship/ReactNativeIntro";
import ReactNativeFullCourseVideo from "@/Services/YoutubeServices/MobileApp/JavaScriptMastery/ReactNativeFullCourse";
// import NewExpoVidComponent from "@/Services/NewExpoVidComponent";

const Courses = () => {
  const navigation: any = useNavigation();

  const { height: screenHeight } = Dimensions.get("window");

  const [inprogressCoursesList, setInProgressCoursesList] = useState<any[]>([]);
  const [status, setStatus] = useState<any>({});
  const [statusSecondVideo, setStatusSecondVideo] = useState<any>({});

  const { user } = useUser();

  const video = useRef<any>(null);
  const secondVideo = useRef<any>(null);

  const GetAllCoursesProgress = () => {
    getAllUserEnrolledCoursesProgress(
      user?.primaryEmailAddress?.emailAddress
    ).then((data) => {
      //console.log("User enrolled courses progress in CourseProgress.tsx", data.userEnrolledCourses);
      setInProgressCoursesList(data.userEnrolledCourses);
    });
  };

  useEffect(() => {
    GetAllCoursesProgress();
  }, [user]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#000"}}>
       <StatusBar backgroundColor="transparent" barStyle="light-content" />

       
       {/* Tabs Row */}
      <View style={{ 
          marginTop: 60,
          height: 50,
          marginHorizontal: 10,
        }}>
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-around',
            gap: 20,
              }}>
             <TouchableOpacity style={{backgroundColor: '#fff',borderRadius: 5, padding: 10, borderWidth: 1, borderColor: "#fff"}}>
          <Text style={{ color: '#000', fontFamily: 'Prompt-SemiBold' }}>All Videos</Text>
        </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor: '#000',borderRadius: 5, padding: 10, borderWidth: 1, borderColor: "#fff"}}>
          <Text style={{ color: '#fff', fontFamily: 'Prompt-SemiBold' }}>Frontend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#000',borderRadius: 5, padding: 10, borderWidth: 1, borderColor: "#fff"}}>
          <Text style={{ color: '#fff', fontFamily: 'Prompt-SemiBold' }}>Backend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#000',borderRadius: 5, padding: 10, borderWidth: 1, borderColor: "#fff"}}>
          <Text style={{ color: '#fff', fontFamily: 'Prompt-SemiBold' }}>Mobile</Text>
        </TouchableOpacity>
       
          </View>
        
      </View>

       {/* Tabs Row 2*/}
       <View style={{ 
          marginTop: 10,
          height: 50,
          marginHorizontal: 10,
        }}>
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-around',
            gap: 20,
              }}>
           <TouchableOpacity style={{backgroundColor: '#000',borderRadius: 5, padding: 10, borderWidth: 1, borderColor: "#fff"}}>
          <Text style={{ color: '#fff', fontFamily: 'Prompt-SemiBold' }}>Data Structures & Algorithms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#000',borderRadius: 5, padding: 10, borderWidth: 1, borderColor: "#fff"}}>
          <Text style={{ color: '#fff', fontFamily: 'Prompt-SemiBold' }}>AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#000',borderRadius: 5, padding: 10, borderWidth: 1, borderColor: "#fff"}}>
          <Text style={{ color: '#fff', fontFamily: 'Prompt-SemiBold' }}>Dev Tips</Text>
        </TouchableOpacity>
       
      
          </View>
        
      </View>


       <ScrollView 
        pagingEnabled 
        showsVerticalScrollIndicator={false}
        snapToAlignment="center"
        // snapToInterval={screenHeight - 140}
        decelerationRate="fast"

        style={{}}
       >
       
         {/* Frontend Videos */}
         <DennisIvyVideo />
         <BroCodeVideo />

         {/* Backend Videos */}
         <DotnetSeriesOneVideo />
         <DotnetSeriesTwoVideo />

         {/* Mobile App Videos */}
         <ReactNativeIntroVideo />
         <ReactNativeFullCourseVideo />

        {/* DevTips Videos */}
        <TraversyMediaVideo />
        <JoelSunnyVideo />
        {/* <NewExpoVidComponent /> */}
        
       </ScrollView>
      
       

         {/* <ScrollView 
        pagingEnabled
         snapToInterval={screenHeight}
         decelerationRate="fast"
         > 
        

           <RandyVideo /> 
         </ScrollView>  */}

        {/* <View>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode={ResizeMode.STRETCH}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={styles.buttonsInARow}>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
            <Button
              title={
                status.isLooping ? "Click to Stop looping" : "click to loop"
              }
              onPress={() => video.current.setIsLoopingAsync(!status.isLooping)}
            />
          </View>
        </View> */}

        {/* <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View> */}

        {/* Second video */}
        {/* <View>
      <Video
        ref={secondVideo}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.STRETCH}
        isLooping
        onPlaybackStatusUpdate={statusSecondVideo => setStatusSecondVideo(() => statusSecondVideo)}
      />
      <View style={styles.buttonsInARow}>
        <Button
          title={statusSecondVideo.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            statusSecondVideo.isPlaying ? secondVideo.current.pauseAsync() : secondVideo.current.playAsync()
          }
        />
        <Button
          title={statusSecondVideo.isLooping ? "Stop looping" : "Set to loop"}
          onPress={() =>
            secondVideo.current.setIsLoopingAsync(!statusSecondVideo.isLooping)
          }
        />
      </View>
    </View> */}
      
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 360,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonsInARow: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  coursesHeaderText: {
    fontFamily: "Prompt-Bold",
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
  },
});
