import { Alert, Pressable, StyleSheet, Text, useWindowDimensions, View,  Dimensions, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack } from "expo-router";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Foundation, Ionicons, FontAwesome6, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



  type VideoPostProps = {
    post: {
      id: string;
      video: string;
      caption: string;
      subcaption: string; 
    };
    activePostId: string;
  };

 
  

const VideoPost = ({post, activePostId}: VideoPostProps) => {

  const [isExpanded, setIsExpanded] = useState(false);

 
  const { height } = useWindowDimensions();

  const video = useRef<Video>(null);

  const [status, setStatus] = useState<AVPlaybackStatus>();

  const isPlaying = status?.isLoaded && status.isPlaying;

  useEffect(() => {
    if (!video.current) {
      return;
    }
    if (activePostId !== post.id) {
      video.current?.pauseAsync();
    }
    if (activePostId === post.id) {
      video.current?.playAsync();
    }
  }, [activePostId, video.current]);

  const onPress = () => {
    //Alert.alert('Pressed');
    if (!video.current) {
      return;
    }
    if (isPlaying) {
      video.current.pauseAsync();
    } else {
    video.current.playAsync();
    }
  }

  return ( 
    <View style={{  height }}>
    
      <Video 
        ref={video}
        source={{uri: post.video}}
        style={[StyleSheet.absoluteFill]}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={setStatus}
        isLooping
      
      />
     
        <Pressable onPress={onPress} style={styles.content}>
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', 'transparent']}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        {!isPlaying &&  
          <Ionicons style={{position: 'absolute', 
            alignSelf: 'center', 
            top: '50%',
            color: "rgba(255,255,255,0.6)"}} name="play" size={40} color="white" />
        }
       
        <SafeAreaView style={{flex: 1}}>
        
          <View style={styles.footer}>

            {/* Left column */}
            <View style={styles.leftColumn}>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <Text style={styles.caption} numberOfLines={isExpanded ? undefined : 2} ellipsizeMode="tail">
                        {post.caption}
                    </Text>
                    <Text style={styles.subcaption} numberOfLines={isExpanded ? undefined : 2} ellipsizeMode="tail">
                        {post.subcaption}
                    </Text>
                </TouchableOpacity>
            </View>
            

            {/* right column */}
            <View style={styles.rightColumn}>
              <Foundation name="heart" size={30} color="white"  />
              <MaterialCommunityIcons name="message-processing-outline" size={30} color="white" />
              <MaterialCommunityIcons name="share-all-outline" size={30} color="white" />
            </View>
          </View>
          </SafeAreaView>

        </Pressable>
      
      
    </View>
  )
}

export default VideoPost

const styles = StyleSheet.create({
  container: {},

  content: {
    flex: 1,
    padding: 10,
  },

  video: {

  },
  footer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'flex-end',
   marginTop: 'auto',
   marginBottom: 60,
   
   
  },
  caption: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Prompt-SemiBold',
    maxWidth: 250
  },
  subcaption: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Prompt-Regular',
    maxWidth: 230
  },

  leftColumn: {
    flex: 1,
    flexWrap: 'wrap',
  },
  rightColumn: {
    gap: 20
  },
  overlay: {
    top: '80%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

})




  