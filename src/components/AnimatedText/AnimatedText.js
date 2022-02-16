import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, {Extrapolate, Value} from 'react-native-reanimated';

const AnimatedText = ({progress, text, isPlaying, setPlay}) => {
  const newWidth = useRef(0);
  const [nws, setNws] = useState(new Value(0));

  const onTextLayout = e => {
    const textWidth = 270 - e?.nativeEvent?.lines[0].width ?? 0;
    console.log('textWidth', textWidth);
    newWidth.current = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [220, textWidth],
      extrapolate: Extrapolate.CLAMP,
    });
    setNws(
      Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [280, textWidth],
        extrapolate: Extrapolate.CLAMP,
      }),
    );
    setPlay(1);
  };
  return (
    <Animated.View
      style={{
        width: 300,
        backgroundColor: 'yellow',
        padding: 10,
        borderWidth: 5,
        borderColor: 'black',
      }}>
      <Text style={[styles.text]} onTextLayout={onTextLayout}>
        {text}
      </Text>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          right: 0,
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            backgroundColor: 'blue',
            width: 2,
            height: 20,
          }}></Animated.View>
        <Animated.View
          style={{
            backgroundColor: 'red',
            height: 42,
            width: nws || newWidth.current,
          }}></Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'nowrap',
    overflow: 'scroll',
    flexDirection: 'row',
    textAlign: 'left',
  },
});
export default AnimatedText;
