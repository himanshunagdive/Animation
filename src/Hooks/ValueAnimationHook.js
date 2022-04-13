import {useState, useRef} from 'react';
import Animated, {
  and,
  block,
  Clock,
  clockRunning,
  cond,
  Easing,
  eq,
  not,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Value,
  call,
  add,
  greaterOrEq,
  or,
} from 'react-native-reanimated';

const runTiming = (
  clock: Animated.Clock,
  isPlaying: Animated.Adaptable<number>,
  callBack: () => void,
  toValue: Animated.Adaptable<number>,
  duration: number,
): any => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: toValue,
    duration: new Value(duration ?? 500),
    easing: Easing.inOut(Easing.linear),
  };

  return block([
    cond(not(isPlaying), [set(state.time, 0)], timing(clock, state, config)),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      stopClock(clock),
      call([], callBack),
    ]),
    state.position,
  ]);
};

export const useValueAnimation = (callBack: () => void, duration: number) => {
  const clock = useRef(new Clock()).current;
  const currentAnimationValue = useRef(new Value(0)).current;
  const isPlaying = useRef(new Value(0)).current;
  const toValue = useRef(new Value(0)).current;
  if (!(callBack && typeof callBack === 'function')) {
    callBack = () => {};
  }
  useCode(
    () => [
      cond(and(isPlaying, not(clockRunning(clock))), [startClock(clock)]),
      cond(and(not(isPlaying), clockRunning(clock)), [stopClock(clock)]),
      set(
        currentAnimationValue,
        runTiming(clock, isPlaying, callBack, toValue, duration),
      ),
    ],
    [],
  );
  const startAnimation = () => {
    isPlaying.setValue(1);
  };
  const animateToValue = value => {
    toValue.setValue(value);
  };
  return [startAnimation, currentAnimationValue, animateToValue];
};
