import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fontStyles } from '../../../styles';

export default ({ title, value }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value}>{value == '' ? '-' : value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    paddingVertical: 7,
  },
  title: {
    flex: .7,
    letterSpacing: 0.7,
    ...fontStyles.r2,
  },
  colon: {
    ...fontStyles.r2,
    marginHorizontal: 15,
  },
  value: {
    flex: 1,
    letterSpacing: 0.7,
    textTransform: 'capitalize',
    ...fontStyles.r2,
  },
});
