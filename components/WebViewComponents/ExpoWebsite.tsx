import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import React from 'react';

export default function ExpoWebsite() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://expo.dev' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
  
    marginTop: Constants.statusBarHeight,
  },
});
