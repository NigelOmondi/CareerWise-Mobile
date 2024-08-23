import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { View , Text} from 'react-native';

export default function ExpoDevWebView() {
    const [webViewHeight, setWebViewHeight] = useState(0);

    const onWebViewMessage = (event: any) => {
        setWebViewHeight(Number(event.nativeEvent.data));
      };
    
      const handleNavigationStateChange = (navState: any) => {
        const { url } = navState;
        if (url.startsWith("snssdk1340://")) {
          // Handle the custom URL scheme here
          console.warn("Custom URL scheme detected:", url);
          return false; // Prevent the WebView from navigating to the URL
        }
        return true;
      };

      
  return (
    <View>
        <View style={{ flex: 1, height: 600 }}>
            <WebView
              source={{ uri: "https://www.tiktok.com/foryou" }}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
              onMessage={onWebViewMessage}
              onNavigationStateChange={handleNavigationStateChange}
              mediaPlaybackRequiresUserAction={false}
              scrollEnabled={true}
            />
            <Text>Web view end</Text>
          </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: Constants.statusBarHeight,
  },
});
