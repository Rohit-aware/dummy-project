import React from 'react';
import Details from './Details';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { fontStyles } from '../../../styles';
import { Colors } from '../../../constants';
import { Dots } from '../../../../assets/icons';

 const LeadsCard = ({
  contactname,
  contactnumber,
  location,
  source,
  companyname,
  onLeadDetails,
  onAddProject,
  add_project
}: any) => {
  return (
    <TouchableWithoutFeedback onPress={onLeadDetails}>
      <View style={styles.card}>
        <View style={styles.wrapper}>
          <Text style={styles.companyname}>{companyname}</Text>
          {add_project && <Text style={styles.btn} onPress={onAddProject} >{'Add Project'}</Text>}
        </View>
        <Details title={'Contact Name'} value={contactname} />
        <Details title={'Contact Number'} value={contactnumber} />
        <Details title={'Location'} value={location} />
        <Details title={'Source'} value={source} />
        <Dots />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    paddingVertical: 15,
  },
  wrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  companyname: {
    ...fontStyles.r8,
    flex: 1.5,
    marginRight: 20,
  },
  btn: {
    ...fontStyles.r3,
    color: Colors.yellow,
    zIndex: 3,
  },
});
export default LeadsCard;