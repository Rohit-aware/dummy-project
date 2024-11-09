import React from 'react';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import moderateScale, { SCREEN_WIDTH } from '../../../constants/dimenssion';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ViewStyle, } from 'react-native';

const spacing = 15;

interface BoxProps {
  totalvalue: string;
  todayvalue: string;
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}
const Box = ({ totalvalue, todayvalue, title, onPress, containerStyle }: BoxProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.wrapper, containerStyle]}>
        <View style={styles.firstrow}>
          <Text style={styles.keys}>Today's</Text>
          <Text style={styles.value}>{todayvalue}</Text>
        </View>
        <View style={styles.secondrow}>
          <Text style={styles.keys}>Total</Text>
          <Text style={styles.value}>{totalvalue}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: moderateScale(150),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: moderateScale(6),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    marginTop: SCREEN_WIDTH / 2.5,
  },
  firstrow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keys: {
    ...fontStyles.r3,
    flex: 1,
  },
  value: {
    marginLeft: moderateScale(5),
    flex: 1,
    textAlign: 'center',
    ...fontStyles.r6,
  },
  secondrow: {
    flexDirection: 'row',
    marginTop: spacing,
    flexWrap: 'wrap',
  },
  title: {
    color: Colors.lightblue,
    textAlign: 'center',
    marginTop: spacing,
    ...fontStyles.r7,
  },
});
export default React.memo(Box);