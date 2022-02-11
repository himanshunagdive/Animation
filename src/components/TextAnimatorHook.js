import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';

const TextAnimatorHook = props => {
  const [textArr, setTextArr] = useState(['']);
  let animatedValues = useRef([]).current;
  // const textArr = [...`Try 'Things to do' in Goa`];
  textArr.forEach((_, i) => {
    animatedValues[i] = new Animated.Value(0);
  });

  useEffect(() => {
    animated();
    setTextArr([...`Try 'Things to do' in Goa`]);
    [...`Try 'Things to do' in Goa`].forEach((_, i) => {
      animatedValues[i] = new Animated.Value(0);
    });
  }, []);

  const animated = (toValue = 1, duration) => {
    const animations = textArr.map((_, i) => {
      return Animated.timing(animatedValues[i], {
        toValue,
        duration: toValue === 1 ? 30 : 5,
        useNativeDriver: true,
      });
    });

    Animated.sequence(toValue === 0 ? animations.reverse() : animations).start(
      () => {
        setTimeout(
          () => animated(toValue === 0 ? 1 : 0, 5),
          toValue === 0 ? 50 : 2000,
        );
        if (props.onFinish) {
          props.onFinish();
        }
      },
    );
  };
  return (
    <View style={[props.style, styles.textWrapper]}>
      {textArr.map((word, index) => {
        return (
          <Animated.Text
            key={`${word}-${index}`}
            style={[
              props.textStyle,
              {
                opacity: animatedValues[index],
              },
            ]}>
            {word}
            {`${index < textArr.length ? '' : ''}`}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
export default TextAnimatorHook;
