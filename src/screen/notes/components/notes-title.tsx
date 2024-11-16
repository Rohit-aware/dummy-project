import React from 'react';
import color from '../../../constants/colors';
import { fontStyles } from '../../../styles';
import { Dots, Pen } from '../../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useMyLeadStore, useStartupStore } from '../../../store';
import { View, Text, StyleSheet, TouchableWithoutFeedback, } from 'react-native';

export default () => {
  const navigation = useNavigation<any>();
  const { leadDetails: { company_name, contact_person, country_id, phone } } = useMyLeadStore();
  const display_info = `${contact_person}  |  +${country_id} ${phone}`;
  const { data: { edit_allowed } = {} } = useStartupStore()
  const onAddNote = () => navigation.navigate('AddNotes');

  return (
    <View style={styles.container}>
      <Text style={styles.companyname}>{company_name}</Text>
      <Text style={styles.info}>{display_info}</Text>
      {true &&
        <TouchableWithoutFeedback onPress={onAddNote}>
          <View style={styles.wrapper}>
            <Pen />
            <Text style={styles.title}>{'Add Note'}</Text>
          </View>
        </TouchableWithoutFeedback>
      }
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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    alignSelf: 'flex-end',
  },
  title: {
    color: color.yellow,
    marginLeft: 10,
    ...fontStyles.r2,
  },
});