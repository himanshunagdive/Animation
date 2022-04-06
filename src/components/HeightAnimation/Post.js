import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {
  gestureHandlerRootHOC,
  // ScrollView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {Value} from 'react-native-reanimated';
import Items from './Items';
import {useAnimation} from '../../customHook';
import VideoPlayer from '../../common/VideoPlayer';
import {useToAnimation} from '../../ValueHook';
const AnimatedVideoPlayer = Animated.createAnimatedComponent(VideoPlayer);
const Post = () => {
  let value = useRef(new Value(0)).current;
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, progress, toValue] = useToAnimation(() => {}, 1);
  const imgHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 200],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    isPlaying.setValue(1);
  }, []);
  const handleScroll = e => {
    console.log('Y ', e.nativeEvent.contentOffset.y);
    const y = e.nativeEvent.contentOffset.y;
    value.setValue(y);
    if (y > 50 && !scrolled) {
      setScrolled(true);
      toValue.setValue(1);
      console.log('@himanshu scrolled up true');
    }
    if (y <= 0 && scrolled) {
      setScrolled(false);
      toValue.setValue(0);
      console.log('@himanshu scrolled down false');
    }
  };

  console.log('himanshu scrolled', scrolled);
  return (
    <Animated.View style={styles.mainContainer}>
      {/*<Animated.Image*/}
      {/*  source={{*/}
      {/*    uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG',*/}
      {/*  }}*/}
      {/*  style={{width: '100%', height: imgHeight}}*/}
      {/*/>*/}
      <Animated.View style={{height: imgHeight, width: '100%'}}>
        <AnimatedVideoPlayer />
      </Animated.View>
      <Animated.ScrollView
        onMomentumScrollEnd={handleScroll}
        // onScroll={handleScroll}
        // scrollEventThrottle={20}
      >
        <Items nums={15} />
      </Animated.ScrollView>
    </Animated.View>
  );

  // return (
  //   <View style={styles.mainContainer}>
  //     <View style={{height: 500, width: '100%', backgroundColor: 'blue'}}>
  //       <VideoPlayer />
  //     </View>
  //     <ScrollView
  //
  //       onMomentumScrollEnd={handleScroll}
  //       scrollEventThrottle={20}
  //     >
  //       <Items nums={15} />
  //     </ScrollView>
  //   </View>
  // );
};
export default gestureHandlerRootHOC(Post);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#c2c2c2',
  },
});
