import React from 'react';
import {View, StyleSheet, Image, InteractionManager} from 'react-native';
import {TouchableOpacity} from 'react-native';
import TimeBar from './TimeBar';

const dummy = [
  require('./Images/superman.jpg'),
  require('./Images/batman.jpg'),
  require('./Images/hulk.jpeg'),
  require('./Images/batman2.jpg'),
  require('./Images/superman.jpg'),
];

export default class InstaStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      stop: true,
    };
    this.inTime = 0;
    this.outTime = 0;
  }
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({stop: false});
    });
  }
  change = () => {
    if (!this.state.stop) {
      if (this.state.active <= 3) {
        this.setState({active: this.state.active + 1});
      }
    }
  };
  handlePressIn = () => {
    this.setState({stop: true}, () => {
      this.inTime = Date.now();
    });
  };
  handlePressOut = () => {
    this.outTime = Date.now();
    const diff = this.outTime - this.inTime;

    if (diff > 100) {
      this.setState({stop: false});
    } else {
      this.setState({stop: false}, () => {
        this.change();
      });
    }
  };
  render() {
    const {active, stop} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.barWrapper}>
          {dummy.map((item, index) => {
            return (
              <TimeBar
                key={index}
                stop={stop}
                change={this.change}
                active={active}
                index={index}
              />
            );
          })}
        </View>

        {dummy.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {active == index && (
                <TouchableOpacity
                  onPressOut={this.handlePressOut}
                  onPressIn={this.handlePressIn}
                  style={styles.imgWrapper}
                  activeOpacity={1}>
                  <Image style={styles.img} source={item} />
                </TouchableOpacity>
              )}
            </React.Fragment>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  imgWrapper: {
    width: '100%',
    height: '100%',
  },
  barWrapper: {
    width: '100%',
    position: 'absolute',
    top: 15,
    zIndex: 4,
    backgroundColor: 'transparent',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
