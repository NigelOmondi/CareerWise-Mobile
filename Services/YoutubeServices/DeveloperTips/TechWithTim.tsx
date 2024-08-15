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

export default function TechWithTimVideo() {
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
        style={{ marginTop: 20,  height: screenHeight - 160 }}
        onPress={togglePlaying}
      >
        <YoutubePlayer
          ref={playerRef}
          play={playing}
          height={300}
          width={Dimensions.get("window").width}
          videoId={"6LA6J4iKNRE"}
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
            How to decide
          </Text>
          <Text
            style={{
              color: "#ffffff90",
              fontFamily: "Prompt-SemiBold",
              fontSize: 18,
            }}
          >
            If you're trying to become a developer then chances are you are
            making this one mistake - jumping between frontend, backend and
            DevOps. It is likely what is holding you back from landing a job.
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
