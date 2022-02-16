import React, {useState, useEffect} from 'react';

import {useAnimation} from '../../customHook';

import AnimatedText from '../AnimatedText/AnimatedText';

const AnimatedTextContainer = ({textArray}) => {
  const times =
    textArray && Array.isArray(textArray) ? textArray.length * 2 - 1 : 1;
  console.log('@himanshu times', times);
  const [play, setPlay, isPlaying, progress] = useAnimation(callBack, 5);

  const [text, setText] = useState(``);
  function callBack(val) {
    let iteration = val[0];
    if (iteration === times) {
      isPlaying.setValue(0);
      return;
    }
    if (iteration % 2) {
      console.log('pausing 2 sec');
      isPlaying.setValue(0);
      setTimeout(() => {
        isPlaying.setValue(1);
      }, 2000);
    } else {
      console.log('setting new text');
      setText(textArray[iteration / 2]);
      isPlaying.setValue(1);
    }
  }

  const animateTextArray = () => {
    setText(textArray[0]);
  };

  useEffect(() => {
    animateTextArray();
  }, []);

  console.log('@himanshu text', text);
  return <AnimatedText progress={progress} text={text} setPlay={setPlay} />;
};

export default AnimatedTextContainer;
