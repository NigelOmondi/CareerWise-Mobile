import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Linking } from 'react-native';

export default function TikTokWebView() {
  const [webViewHeight, setWebViewHeight] = useState(0);

  const onWebViewMessage = (event: any) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;

    if (url.startsWith("snssdk1340://")) {
      Alert.alert(
        "Leaving the App",
        "You are about to be redirected to TikTok. Do you want to continue?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              // Prevent the WebView from navigating to the URL
              return;
            },
          },
          {
            text: "OK",
            onPress: () => {
              Linking.openURL('https://www.tiktok.com/');
            },
          },
        ],
        { cancelable: true }
      );

      return false; // Prevent the WebView from navigating until the user confirms
    }

    return true;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <WebView
        source={{ uri: "https://www.tiktok.com/foryou" }}
        style={{ height: webViewHeight, marginTop: Constants.statusBarHeight }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
        onMessage={onWebViewMessage}
        onNavigationStateChange={handleNavigationStateChange}
        mediaPlaybackRequiresUserAction={false}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: Constants.statusBarHeight,
  },
});
