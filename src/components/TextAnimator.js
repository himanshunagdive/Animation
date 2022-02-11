import * as React from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';

export default class TextAnimator extends React.Component {
  animatedValues = [];

  constructor(props) {
    super(props);

    const textArr =
      [...`Try 'Things to do' in Goa`] || props.content.trim().split(' ');
    textArr.forEach((_, i) => {
      this.animatedValues[i] = new Animated.Value(0);
    });
    this.textArr = textArr;
  }

  componentDidMount() {
    this.animated();
  }

  animated = (toValue = 1, duration) => {
    const animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue,
        duration: toValue === 1 ? 30 : 5,
        useNativeDriver: true,
      });
    });

    Animated.sequence(toValue === 0 ? animations.reverse() : animations).start(
      () => {
        setTimeout(
          () => this.animated(toValue === 0 ? 1 : 0, 5),
          toValue === 0 ? 2000 : 50,
        );
        if (this.props.onFinish) {
          this.props.onFinish();
        }
      },
    );
  };

  render() {
    return (
      <View style={[this.props.style, styles.textWrapper]}>
        {this.textArr.map((word, index) => {
          return (
            <Animated.Text
              key={`${word}-${index}`}
              style={[
                this.props.textStyle,
                {
                  opacity: this.animatedValues[index],
                },
              ]}>
              {word}
              {`${index < this.textArr.length ? '' : ''}`}
            </Animated.Text>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
