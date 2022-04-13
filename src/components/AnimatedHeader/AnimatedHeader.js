import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Items from '../HeightAnimation/Items';
import Animated, {
  Value,
  set,
  event,
  block,
  sub,
  cond,
  lessThan,
  greaterThan,
} from 'react-native-reanimated';

const HeaderAnimation = () => {
  let val = useRef(new Value(0));
  let prevY = useRef(new Value(0));
  let diff = useRef(new Value(0));
  let compHeight = useRef(new Value(200));

  // let height = val.current;
  let height = val.current.interpolate({
    inputRange: [90, 200],
    outputRange: [-110, 0],
  });

  const onScroll = Animated.event([
    {
      nativeEvent: ({contentOffset: {y: newY}}) => {
        return block([
          set(diff.current, sub(newY, prevY.current)),
          set(compHeight.current, sub(compHeight.current, diff.current)),
          cond(lessThan(compHeight.current, 90), set(compHeight.current, 90)),
          cond(
            greaterThan(compHeight.current, 200),
            set(compHeight.current, 200),
          ),
          set(val.current, compHeight.current),
          set(prevY.current, newY),
        ]);
      },
    },
  ]);

  return (
    <Animated.View style={{flex: 1}}>
      <Animated.View style={[styles.header, {translateY: height, opacity: 1}]}>
        <Text
          style={{
            fontSize: 200,
            textAlign: 'center',
            color: 'pink',
          }}>
          Hi !
        </Text>
      </Animated.View>
      <Animated.ScrollView onScroll={onScroll}>
        <View style={styles.dummy}></View>
        <Items nums={15} />
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default HeaderAnimation;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: 'blue',
    position: 'absolute',
    zIndex: 2,
    elevation: 10,
  },
  dummy: {width: '100%', height: 200, backgroundColor: 'red'},
});
