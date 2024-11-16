import React from 'react';
import { fontStyles } from '../../../styles';
import Colors from '../../../constants/colors';
import { Dots } from '../../../../assets/icons';
import { View, Text, StyleSheet } from 'react-native';
import useToggleText from '../../../components/toggle-text/use-toggle-text';

export default ({ name, status, date, notes }: { name: string, status: string, date: string, notes: string }) => {
  const { ToggleText, textToShow } = useToggleText({ input: notes, maxLength: 150 });
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.notes}>{textToShow}</Text>
      {ToggleText}
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginHorizontal: 15,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    ...fontStyles.r13,
  },
  status: {
    marginTop: 5,
    textTransform: 'capitalize',
    ...fontStyles.r13,
  },
  date: {
    ...fontStyles.r16,
  },
  notes: {
    ...fontStyles.r2,
    marginTop: 10,
  },
  toggleText: {
    textDecorationLine: 'underline',
    ...fontStyles.r14,
    color: Colors.blue,
    alignSelf: 'flex-end'
  },
});