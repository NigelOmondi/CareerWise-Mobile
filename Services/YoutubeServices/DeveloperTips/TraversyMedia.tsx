import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Button,
  View,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  Easing
} from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import PumpingIcon from "@/components/PumpingPlayIcon";

type VideoPostProps = {
  post: {
    id: string;
    video: string;
    caption: string;
  };
  activePostId: string;
};

export default function TraversyMediaVideo() {

  const [playing, setPlaying] = useState(false);

  const [status, setStatus] = useState<AVPlaybackStatus>();

  const isPlaying = status?.isLoaded && status.isPlaying;

  const playerRef = useRef<YoutubeIframeRef>(null);

  const { height: screenHeight } = Dimensions.get("window");

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  // useEffect(() => {
  //   if (!playerRef.current) {
  //     return;
  //   }
  //   if (activePostId !== post.id) {
  //     video.current?.pauseAsync();
  //   }
  //   if (activePostId === post.id) {
  //     video.current?.playAsync();
  //   }
  // }, [playerRef.current]);

  return (
    <>
      <Pressable
        style={{ marginTop: 20,  height: screenHeight - 160}}
        onPress={togglePlaying}
      >
        <YoutubePlayer
          ref={playerRef}
          height={300}
          play={playing}
          videoId="ImSjJwzqAss"
          onChangeState={onStateChange}
        />

        <PumpingIcon playing={playing} />

        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              color: "#ffffff",
              fontFamily: "Prompt-Bold",
              fontSize: 20,
            }}
          >
            Specialization
          </Text>
          <Text
            style={{
              color: "#ffffff90",
              fontFamily: "Prompt-SemiBold",
              fontSize: 18,
            }}
          >
            Many people want to learn everything, which is impossible. Pick a
            tech stack and learn as much as you can about that group of
            technologies.
          </Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: -100,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
