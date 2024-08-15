import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';


const PumpingIcon = ({ playing }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pumpAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    pumpAnimation.start();

    return () => pumpAnimation.stop();
  }, [scaleValue]);

  return (
    !playing && (
      <Animated.View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '40%',
          transform: [{ scale: scaleValue }]
        }}
      >
        <View style={{ opacity: 0.5 }}>
      <Ionicons name="play" size={40} color="#fff" />
    </View>
      </Animated.View>
    )
  );
};

export default PumpingIcon;