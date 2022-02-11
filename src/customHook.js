import {useState, useRef} from 'react';
import Animated, {
  and,
  block,
  Clock,
  clockRunning,
  cond,
  EasingNode,
  eq,
  not,
  proc,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Value,
  call,
  add,
  debug,
  greaterOrEq,
} from 'react-native-reanimated';
import {delay} from './components/animatedUtils';

const runTiming = (clock, clockValue, isPlaying, callBack, count) => {
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
    easing: EasingNode.inOut(EasingNode.linear),
  };

  return block([
    cond(not(isPlaying), [set(state.time, 0)], timing(clock, state, config)),
    cond(eq(state.finished, 1), [
      set(state.count, add(state.count, new Value(1))),
      cond(greaterOrEq(state.count, count), [stopClock(clock)]),
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

export const useAnimation = (callBack, count) => {
  const [play, setPlay] = useState(false);
  const clock = useRef(new Clock()).current;
  const progress = useRef(new Value(0)).current;
  const isPlaying = useRef(new Value(0)).current;
  const clockValue = useRef(new Value(0)).current;
  useCode(() => [set(isPlaying, play ? 1 : 0)], [play]);
  useCode(
    () => [
      cond(and(isPlaying, not(clockRunning(clock))), [startClock(clock)]),
      cond(and(not(isPlaying), clockRunning(clock)), [stopClock(clock)]),
      set(progress, runTiming(clock, clockValue, isPlaying, callBack, count)),
    ],
    [],
  );
  return [play, setPlay, isPlaying, progress];
};
