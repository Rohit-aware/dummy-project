import React from 'react';
import { fontStyles } from '../../../../../styles';
import { Dots } from '../../../../../../assets/icons';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export default ({ title, time, description, showProjectDetail }: any) => {
  return (
    <Pressable onPress={showProjectDetail}>
      <View style={styles.wrapper}>
        <Dots style={styles.dot} />
        <View style={styles.conatiner}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 15,
    paddingBottom: 25,
    marginHorizontal: 15,
  },
  dot: {
    top: 0,
  },
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  title: {
    flex: 1,
    marginRight: 15,
    ...fontStyles.r8,
  },
  time: {
    alignSelf: 'flex-start',
    marginTop: 5,
    ...fontStyles.r9,
  },
  description: {
    ...fontStyles.r2,
    marginTop: 12,
  },
});