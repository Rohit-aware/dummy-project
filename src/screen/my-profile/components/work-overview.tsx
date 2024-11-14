import React from 'react';
import Statistic from './statistic';
import ChangeYear from './ChangeYear';
import { View, StyleSheet } from 'react-native';

export default ({ year, open, loading }: any) => {
  return (
    <View style={styles.wrapper}>
      <ChangeYear year={year} open={open} loading={loading} />
      <Statistic />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15,
  },
});
