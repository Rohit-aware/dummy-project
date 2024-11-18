import React from 'react';
import { fontStyles } from '../../../styles';
import { Creator } from '../../../../assets/icons';
import { View, Text, StyleSheet } from 'react-native';

export default ({ title, value, showIcon }: { title: string, value: string, showIcon?: boolean }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value}>{value}</Text>
      {showIcon && <Creator height={20} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  title: {
    ...fontStyles.r2,
    width: 130,
  },
  colon: {
    marginHorizontal: 15,
    ...fontStyles.r2,
  },
  value: {
    ...fontStyles.r2,
    flex: 1,
  },
});


