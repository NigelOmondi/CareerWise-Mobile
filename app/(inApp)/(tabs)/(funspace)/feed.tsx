import { Alert, Pressable, StyleSheet, Text, View, FlatList, Dimensions, FlatListProps } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, memo } from 'react'
import { Stack } from "expo-router";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Foundation, Ionicons, FontAwesome6, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import VideoPost from '@/components/TikTokVideoPost';

const dummyPosts = [
    {
      id: '2',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
      caption: 'The Bustling City of Nairobi',
      subcaption: 'This economic hub is the place to be!',
    },
    {
      id: '1',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
      caption: 'Hey there',
      subcaption: '10X Software Engineers be like...',
    },
    {
      id: '3',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
      caption: 'Hola',
      subcaption: '10X Software Engineers be like...',
    },
    {
      id: '4',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
      caption: 'Piano practice',
      subcaption: '10X Software Engineers be like...',
    },
    {
      id: '5',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
      caption: 'Hello World!',
      subcaption: '10X Software Engineers be like...',
    },
  ];

const FeedScreen = () => {

  const [activePostId, setActivePosId] = useState(dummyPosts[0].id);
  const [posts, setPosts] = useState<typeof dummyPosts>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        // Simulate fetching posts
        if (isMounted) {
          setPosts(dummyPosts);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        Alert.alert('Error', 'Failed to fetch posts');
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const { height: screenHeight } = Dimensions.get('window');

  const onViewableItemsChanged = useCallback(({changed, viewableItems}: any) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setActivePosId(viewableItems[0].item.id);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([{
    viewabilityConfig: {
      itemVisiblePercentThreshold: 50
    },
    onViewableItemsChanged: ({changed, viewableItems}: any) => {
      if (viewableItems.length > 0 && viewableItems[0].isViewable) {
        setActivePosId(viewableItems[0].item.id);
      }
    }
  }]);

  const onEndReached = () => {
    setPosts((currentPosts) => [...currentPosts, ...dummyPosts]);
  };

  return ( 
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <VideoPost post={item} activePostId={activePostId} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToInterval={screenHeight}
        decelerationRate={"fast"}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={3}
      />
    </View>
  )
}

export default FeedScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})