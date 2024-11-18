import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Dots } from '../../../../assets/icons';

export default () => {
  return (
    <View style={styles.container}>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
});