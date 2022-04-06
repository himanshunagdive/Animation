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
  EasingNode,
} from 'react-native-reanimated';

const runTiming = (
  clock: Animated.Clock,
  isPlaying: Animated.Adaptable<number>,
  callBack: () => void,
  count: Animated.Adaptable<number>,
  toValue,
): any => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
    count: new Value(0),
  };
  const config = {
    toValue: toValue,
    duration: new Value(1300),
    easing: EasingNode.inOut(EasingNode.linear),
  };

  return block([
    cond(not(isPlaying), [set(state.time, 0)], timing(clock, state, config)),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
    ]),
    state.position,
  ]);
};

export const useToAnimation = (callBack: () => void, count = 1) => {
  const clock = useRef(new Clock()).current;
  const progress = useRef(new Value(0)).current;
  const isPlaying = useRef(new Value(0)).current;
  const toValue = useRef(new Value(0)).current;
  if (!(callBack && typeof callBack === 'function')) {
    callBack = () => {};
  }
  useCode(
    () => [
      cond(and(isPlaying, not(clockRunning(clock))), [startClock(clock)]),
      cond(and(not(isPlaying), clockRunning(clock)), [stopClock(clock)]),
      set(progress, runTiming(clock, isPlaying, callBack, count, toValue)),
    ],
    [],
  );
  return [isPlaying, progress, toValue];
};
