import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontStyles } from '../../../styles';
import { helpers } from '../../../utility';

export default ({ title, value, containerStyle }: any) => {
  const { checkForEmpty } = helpers;
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value} ellipsizeMode="tail">
        {checkForEmpty(value) ? '-' : value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    opacity: 0.8,
    flex: 0.4,
    ...fontStyles.r3,
  },
  colon: {
    opacity: 0.8,
    marginHorizontal: 15,
    ...fontStyles.r3,
  },
  value: {
    opacity: 0.8,
    flex: .6,
    ...fontStyles.r3,
  },
});
