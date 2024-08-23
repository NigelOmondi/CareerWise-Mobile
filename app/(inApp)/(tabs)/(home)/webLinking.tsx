import React from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

export default function Weblink() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://expo.dev')}
        style={styles.button}
      >
        <Text>Open URL with the system browser</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => WebBrowser.openBrowserAsync('https://expo.dev')}
        style={styles.button}
      >
        <Text>Open URL with an in-app browser</Text>
      </TouchableOpacity> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});
