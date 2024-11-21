import React from 'react';
import { fontStyles } from '../../../../../styles';
import { Dots } from '../../../../../../assets/icons';
import { View, StyleSheet, Pressable, Text } from 'react-native';

interface FollowupCardProps {
  contactperson: string;
  date: string;
  companyname: string;
  onShowLeadDetail: () => void;
}

export default ({ contactperson, date, companyname, onShowLeadDetail }: FollowupCardProps) => {
  return (
    <Pressable onPress={onShowLeadDetail}>
      <View style={styles.wrapper}>
        <Dots style={styles.dot} />
        <View style={styles.container}>
          <Text style={styles.contactperson}>{contactperson}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.companyname}>{companyname}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 15,
    paddingBottom: 20,
    marginHorizontal: 15,
  },
  dot: {
    top: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  contactperson: {
    ...fontStyles.r8,
    flex: 1,
    marginRight: 15,
  },
  date: {
    ...fontStyles.r9,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  companyname: {
    marginTop: 12,
    ...fontStyles.r2,
  },
});