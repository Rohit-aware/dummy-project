import React from 'react';
import { fontStyles } from '../../../styles';
import { View, Text, StyleSheet, } from 'react-native';

export default ({ title, value }: { title: string, value: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.colon}>{':'}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    paddingVertical: 5,
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