import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Colors } from '../../../constants';

export default () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    width: '100%',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
    opacity: 0.4,
    bottom: 0,
  },
});
