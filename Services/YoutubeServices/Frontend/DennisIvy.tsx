import PumpingIcon from "@/components/PumpingPlayIcon";
import { commonStyles } from "@/styles/Common/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useCallback, useRef } from "react";
import {
  Button,
  View,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  SafeAreaView,
} from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";

export default function DennisIvyVideo() {
  const [playing, setPlaying] = useState(false);

  const playerRef = useRef<YoutubeIframeRef>(null);

  const { height: screenHeight } = Dimensions.get("window");

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      //Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <>
      <Pressable
        style={{ marginTop: 20,  height: screenHeight - 160}}
        onPress={togglePlaying}
      >
        <YoutubePlayer
          ref={playerRef}
          play={playing}
          height={300}
          width={Dimensions.get("window").width}
          videoId={"yAbnoYfV99g"}
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
            Why and When to use React JS

          </Text>
          <Text
            style={{
              color: "#ffffff90",
              fontFamily: "Prompt-SemiBold",
              fontSize: 18,
            }}
          >
           React JS is not always my go to choice, but 
           in this video I explain why its a great tool 
           for everyone to learn but also when I chose to avoid it.
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
