import React from 'react';
import { helpers } from '../../../../../utility';
import { fontStyles } from '../../../../../styles';
import { Call } from '../../../../../../assets/icons';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';

export default ({ title, value, style, call }: { title: string, value: string | undefined, style?: ViewStyle, call?: boolean }) => {
  const { openCall } = helpers;
  return (
    <View style={[styles.employee, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value}>{value == 'undefined' ? '-' : value}</Text>
      {call && (
        <Pressable onPress={() => openCall({ phone: value! })}>
          <Call width={21} height={21} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  employee: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  title: {
    width: 130,
    letterSpacing: 0.7,
    ...fontStyles.r2,
  },
  colon: {
    marginHorizontal: 15,
    ...fontStyles.r2,
  },
  value: {
    flex: 1,
    letterSpacing: 0.7,
    textTransform: 'capitalize',
    ...fontStyles.r2,
  },
});
