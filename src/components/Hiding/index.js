import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {useToAnimation} from '../../ValueHook';
import {useValueAnimation} from '../../Hooks/ValueAnimationHook';
import Animated from 'react-native-reanimated';
import TIOW from './TIOW';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Hiding = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [startAnimation, currentAnimationValue, animateToValue] =
    useValueAnimation(callBack);

  function callBack() {
    setShowOverlay(false);
    console.log('@himanshu callback');
  }

  const opacityAnimation = currentAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    // startAnimation();
    // animateToValue(1);
  }, []);

  return (
    <View style={{flex: 1}}>
      {showOverlay ? (
        <Animated.View
          style={{
            position: 'absolute',
            width: width,
            height: height,
            opacity: 1 || opacityAnimation,
            // zIndex: 999,
            top: 0,
            elevation: 10,
          }}>
          <TIOW />
        </Animated.View>
      ) : null}
      <View style={styles.blueBox}>
        <TouchableOpacity
          onPress={() => {
            console.log('@himanshu pressed');
          }}>
          <View
            style={{height: 50, width: 100, backgroundColor: 'green'}}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  blueBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});
export default Hiding;
