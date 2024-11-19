import React from 'react';
import CheckBox from 'react-native-check-box';
import { Colors } from '../../../../constants';
import { fontStyles } from '../../../../styles';
import { View, Text, StyleSheet } from 'react-native';
interface InformationProps {
  title: string;
  value: string;
  check?: boolean;
  showCheckbox?: boolean;
  checkToggle?: () => void;
}

export default ({ title, value, check, showCheckbox, checkToggle }: InformationProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.colon}>{':'}</Text>
      <Text style={styles.value}>{value}</Text>
      {showCheckbox && (
        <CheckBox
          isChecked={check!}
          checkedCheckBoxColor={Colors.lightblue}
          onClick={checkToggle! }
          uncheckedCheckBoxColor={Colors.lightblue}
          style={styles.checkStyle}
        />
      )}
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
  checkStyle: {
    zIndex: -10,
  },
});
