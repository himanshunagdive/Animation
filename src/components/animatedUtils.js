import {
  block,
  call,
  Clock,
  clockRunning,
  EasingNode,
  startClock,
  timing,
  useCode,
  Value,
  cond,
  eq,
  stopClock,
  set,
} from 'react-native-reanimated';

export const delay = (callBack = () => {}) => {
  // console.log('@himanshu delay called');
  // const clock = new Clock();
  // const state = {
  //   finished: new Value(0),
  //   position: new Value(0),
  //   frameTime: new Value(0),
  //   time: new Value(0),
  // };
  // const config = {
  //   toValue: new Value(5),
  //   duration: new Value(2000),
  //   easing: EasingNode.inOut(EasingNode.linear),
  // };
  // startClock(clock);
  // console.log('@himanshu delay called 2');
  // s
  // block([
  //   startClock(clock),
  //   timing(clock, state, config),
  //   call([], () => {
  //     console.log('call');
  //   }),
  //   cond(eq(state.finished, 1), [
  //     set(state.finished, 0),
  //     call([], callBack),
  //     stopClock(clock),
  //   ]),
  //   state.position,
  // ]);

  setTimeout(callBack, 2000);
};
