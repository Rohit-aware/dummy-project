import React from 'react';
import { helpers } from '../../../utility';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
interface ViewInfoType {
  title: string;
  value: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  file: string;
}


export default ({ title, value, onPress, containerStyle, file }: ViewInfoType) => {
  const { checkForEmpty } = helpers;
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value} ellipsizeMode="tail">
        {checkForEmpty(value) ? '-' : value}
      </Text>
      {checkForEmpty(file) ? null :
        <Text style={styles.view} onPress={onPress}>
          {'View'}
        </Text>
      }
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
    flex: 0.6,
    ...fontStyles.r3,
  },
  colon: {
    opacity: 0.8,
    marginHorizontal: 15,
    ...fontStyles.r3,
  },
  value: {
    opacity: 0.8,
    flex: 1,
    ...fontStyles.r3,
  },
  view: {
    ...fontStyles.r3,
    opacity: 0.8,
    color: Colors.yellow,
    marginLeft: 10,
  },
});
