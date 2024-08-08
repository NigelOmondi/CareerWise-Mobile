import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CourseProgressBar = ({totalChapters, completedChapters}: any) => {

    //console.log("completed chapters in CourseProgressBar.tsx", completedChapters);
    //console.log("Total chapters in CourseProgressBar.tsx", totalChapters )

  const width = (completedChapters / totalChapters) * 100;
  const roundedWidth = Math.round(width)

  return (
    <>
    <View
      style={{
        width: "100%",
        height: 7,
        backgroundColor: "#00000020",
        borderRadius: 50,
        marginTop: 5,
      }}
    >
      <View
        style={{
          width: `${width}%`,
          height: 7,
          backgroundColor: "#0F5DFF99",
          borderRadius: 50,
        }}
      ></View>
    </View>
    <Text style={{textAlign: 'right'}}>{roundedWidth}% complete</Text>
    </>
  );
};

export default CourseProgressBar;

const styles = StyleSheet.create({});
