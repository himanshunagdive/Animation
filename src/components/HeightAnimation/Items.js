import React from 'react';
import {Text, View} from 'react-native';
const Items = ({nums}) => {
  return Array(nums)
    .fill()
    .map((t, index) => {
      return (
        <View
          key={index}
          style={{
            height: 100,
            backgroundColor: 'green',
            width: '100%',
            margin: 10,
          }}>
          <Text>{index}</Text>
        </View>
      );
    });
};
export default Items;
