import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Items from '../HeightAnimation/Items';
import Animated, {Value, set, event} from 'react-native-reanimated';

const HeaderAnimation = () => {
  let val = useRef(new Value(0));
  let height = val.current.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 90],
    extrapolate: 'clamp',
  });

  console.log('height ', height);
  return (
    <Animated.View style={{flex: 1}}>
      <Animated.View
        style={[styles.header, {height: height, opacity: 0.5}]}></Animated.View>
      <Animated.ScrollView
        onScroll={event([
          {nativeEvent: {contentOffset: {y: y => set(val.current, y)}}},
        ])}>
        <View style={styles.dummy}></View>
        <Items nums={10} />
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
    top: 0,
    zIndex: 2,
    elevation: 10,
  },
  dummy: {width: '100%', height: 200, backgroundColor: 'red'},
});
