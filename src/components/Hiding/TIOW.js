import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const star = require('../../common/Star3x.png');

const TIOW = () => {
  return (
    <View style={styles.main}>
      <LinearGradient
        colors={['#3023AE', '#C86DD7']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{
          height: 64,
          width: 64,
          borderRadius: 32,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Image
          source={star}
          style={{
            height: 34,
            width: 34,
            tintColor: 'white',
            zIndex: 3,
            position: 'absolute',
            resizeMode: 'contain',
          }}
        />
      </LinearGradient>
      <Text style={styles.text}> Where2Go</Text>
      <Text style={styles.text}> this week</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  starContainer: {},
});
export default TIOW;
