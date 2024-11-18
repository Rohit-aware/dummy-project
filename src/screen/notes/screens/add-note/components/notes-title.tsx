import React from 'react';
import { fontStyles } from '../../../../../styles';
import { useMyLeadStore } from '../../../../../store';
import { Dots } from '../../../../../../assets/icons';
import { View, Text, StyleSheet } from 'react-native';

export default () => {
  const { leadDetails: { company_name, contact_person, country_id, phone } } = useMyLeadStore();
  const display_info = `${contact_person}  |  +${country_id} ${phone}`;
  return (
    <View style={styles.container}>
      <Text style={styles.companyname}>{company_name}</Text>
      <Text style={styles.info}>{display_info}</Text>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 15,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  companyname: {
    ...fontStyles.r10,
    textAlign: 'center',
  },

  info: {
    marginTop: 15,
    marginRight: 20,
    ...fontStyles.r3,
    textAlign: 'center',
  },
});
