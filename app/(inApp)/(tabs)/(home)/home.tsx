import { View, Text, TouchableOpacity, StyleSheet, Button, StatusBar } from 'react-native'
import React, {useRef, useEffect} from 'react'
import { commonStyles } from '@/styles/Common/commonStyles'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const navigation: any = useNavigation();
  const animation = useRef<LottieView>(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);
  return (
    // <View style={styles.animationContainer}>
    //   <LottieView
    //     autoPlay
    //     ref={animation}
    //     style={{
    //       width: 200,
    //       height: 200,
    //       backgroundColor: '#fff',
    //     }}
    //     // Find more Lottie files at https://lottiefiles.com/featured
    //     source={require('@/assets/images/reading-robot-animation.json')}
    //   />
    //   <View style={styles.buttonContainer}>
    //     <Button
    //       title="Restart Animation"
    //       onPress={() => {
    //         animation.current?.reset();
    //         animation.current?.play();
    //       }}
    //     />
    //   </View>
    // </View>
    <LinearGradient
      colors={['#E5ECF9', '#F6F7F9']}
      style={{flex: 1}}
    >
      <View style={commonStyles.basicContainer}>
        <Text>Home</Text>
      </View>
      <StatusBar barStyle="light-content" />
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});