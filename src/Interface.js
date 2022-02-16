export interface AnimationHook {
  callback: () => {};
  count: number;
}

export interface RunTiming {
  clock: any;
  clockValue: any;
  isPlaying: any;
  callBack: () => {};
  count: number;
}
