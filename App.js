/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useAnimation} from './src/customHook';

import ProgressBar from './src/components/progressBar';
import {Value} from 'react-native-reanimated';
import AnimatedText from './src/components/AnimatedText/AnimatedText';
import TextAnimator from './src/components/TextAnimator';
import TextAnimatorHook from './src/components/TextAnimatorHook';
import AnimatedTextContainer from './src/components/AnimatedText/AnimatedTextContainer';
import Post from './src/components/HeightAnimation/Post';
import InstaStories from './src/components/InstaStories';
import Hiding from './src/components/Hiding';

const App: () => Node = () => {
  // const [play, setPlay, isPlaying, progress] = useAnimation();

  const textArray = [
    `Try 'Things to do in Goa'`,
    `Try 'Nearby places to visit'`,
    'Search & Discover New Places',
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.sectionContainer}>
        {/*<ProgressBar count={1} progress={progress} />*/}
        {/*<Button*/}
        {/*  title={play ? 'pause' : 'play'}*/}
        {/*  onPress={() => {*/}
        {/*    setTimeout(() => setPlay(x => !x));*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<AnimatedTextContainer textArray={textArray} />*/}
        {/*<TextAnimator*/}
        {/*  content="Try Searching for things to do️️️️"*/}
        {/*  textStyle={styles.textStyle}*/}
        {/*  style={styles.containerStyle}*/}
        {/*  duration={200}*/}
        {/*  onFinish={_onFinish}*/}
        {/*/>*/}
        {/*<TextAnimatorHook*/}
        {/*  content="Try Searching for things to do️️️️"*/}
        {/*  textStyle={styles.textStyle}*/}
        {/*  style={styles.containerStyle}*/}
        {/*  duration={200}*/}
        {/*  onFinish={_onFinish}*/}
        {/*/>*/}
        {/*<Post />*/}
        {/*<InstaStories />*/}
        <Hiding />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 100,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  containerStyle: {},
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    // fontFamily: 'Menlo',
    // marginBottom: 14,
  },
});

export default App;
