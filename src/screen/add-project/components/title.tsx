import React from 'react';
import { fontStyles } from '../../../styles';
import { useMyLeadStore } from '../../../store';
import { Dots } from '../../../../assets/icons';
import { View, StyleSheet, Text } from 'react-native';

export default () => {
  const { leadDetails } = useMyLeadStore();
  const {
    company_name,
    contact_person,
    city_name,
    country_id,
    phone,
    country_name,
    state_name,
  } = leadDetails;

  const display_name = `${contact_person} | +${country_id} ${phone}`;
  const location =
    city_name == '' || state_name == null
      ? country_name
      : `${city_name}, ${state_name}`;

  return (
    <View style={styles.container}>
      <Text style={styles.companyname}>{company_name}</Text>
      <Text style={styles.personname}>{display_name}</Text>
      <Text style={styles.location}>{location}</Text>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    marginHorizontal: 15,
  },
  companyname: {
    textAlign: 'center',
    ...fontStyles.r10,
  },
  personname: {
    marginTop: 10,
    textAlign: 'center',
    ...fontStyles.r3,
  },
  location: {
    marginTop: 10,
    textAlign: 'center',
    ...fontStyles.r3,
  },
});
