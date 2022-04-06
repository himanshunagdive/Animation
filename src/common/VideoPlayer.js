// Load the module

import Video from 'react-native-video';
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
class VideoPlayer extends React.Component {
  render() {
    return (
      <Video
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }} // Can be a URL or a local file.
        // ref={ref => {
        //   this.player = ref;
        // }} // Store reference
        // onBuffer={this.onBuffer} // Callback when remote video is buffering
        // onError={this.videoError} // Callback when video cannot be loaded
        // style={styles.backgroundVideo}
        onLoad={() => {
          console.log('video load');
        }}
        onReadyForDisplay={() => {
          console.log('ready');
        }}
        style={{flex: 1, backgroundColor: 'grey'}}
        resizeMode={'contain'}
      />
    );
  }
}

// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    height: 300,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlayer;
