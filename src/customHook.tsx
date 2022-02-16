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
  count: Animated.Adaptable<number>,
): any => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
    count: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration: new Value(3000),
    easing: Easing.inOut(Easing.linear),
  };

  return block([
    cond(not(isPlaying), [set(state.time, 0)], timing(clock, state, config)),
    cond(eq(state.finished, 1), [
      set(state.count, add(state.count, new Value(1))),
      cond(or(greaterOrEq(state.count, count), eq(count, 1)), [
        stopClock(clock),
      ]),
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(
        config.duration,
        cond(
          eq(state.position, 1),
          [set(config.duration, 1000)],
          [set(config.duration, 3000)],
        ),
      ),
      call([state.count], callBack),
      set(config.toValue, not(state.position)),
    ]),
    state.position,
  ]);
};

export const useAnimation = (callBack: () => void, count = 1) => {
  const [play, setPlay] = useState(false);
  const clock = useRef(new Clock()).current;
  const progress = useRef(new Value(0)).current;
  const isPlaying = useRef(new Value(0)).current;
  if (!(callBack && typeof callBack === 'function')) {
    callBack = () => {};
  }
  useCode(() => [set(isPlaying, play ? 1 : 0)], [play]);
  useCode(
    () => [
      cond(and(isPlaying, not(clockRunning(clock))), [startClock(clock)]),
      cond(and(not(isPlaying), clockRunning(clock)), [stopClock(clock)]),
      set(progress, runTiming(clock, isPlaying, callBack, count)),
    ],
    [],
  );
  return [play, setPlay, isPlaying, progress];
};
