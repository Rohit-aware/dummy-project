import React from 'react';
import { Colors } from '../../../../../constants';
import { fontStyles } from '../../../../../styles';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default ({ title, onPress, active }: { title: string, onPress: () => void, active: string }) => {
  const textStyle = { color: active == title ? Colors.yellow : Colors.black }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text
        style={[
          styles.title,
          textStyle
        ]}>
        {title}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    ...fontStyles.r7,
    flex: 1,
    textAlign: 'center',
    // color: active == i ? Colors.yellow : Colors.black,
    color: Colors.black,
  },
});
