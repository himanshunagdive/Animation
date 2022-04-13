import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useValueAnimation} from '../../Hooks/ValueAnimationHook';
import Animated from 'react-native-reanimated';
const star = require('../../common/Star3x.png');

const TIOW = () => {
  const [startAnimation, currentAnimationValue, animateToValue] =
    useValueAnimation(null, 1300);

  useEffect(() => {
    startAnimation();
    animateToValue(1);
  }, []);

  const opacity = currentAnimationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const translateY = currentAnimationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [30, 30, 0],
  });

  const iconTranslate = currentAnimationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [200, 0, 0],
  });

  return (
    <View style={styles.main}>
      <Animated.View style={{translateY: iconTranslate}}>
        <LinearGradient
          colors={['#3023AE', '#C86DD7']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{
            height: 64,
            width: 64,
            borderRadius: 32,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={star}
            style={{
              height: 34,
              width: 34,
              tintColor: 'white',
              zIndex: 3,
              position: 'absolute',
              resizeMode: 'contain',
            }}
          />
        </LinearGradient>
      </Animated.View>
      {['Where2Go', 'this week'].map(text => {
        return (
          <Animated.Text
            style={[styles.text, {opacity: opacity, translateY: translateY}]}>
            {text}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  starContainer: {},
});
export default TIOW;
