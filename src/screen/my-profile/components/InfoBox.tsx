import React from 'react';
import { helpers } from '../../../utility';
import { fontStyles } from '../../../styles';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

export default ({ title, value, containerStyle }: { title: string, value: string, containerStyle?: ViewStyle }) => {
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
