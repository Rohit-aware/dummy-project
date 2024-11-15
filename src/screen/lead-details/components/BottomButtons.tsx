import React from 'react';
import { Button } from '../../../components';
import { useMyLeadStore } from '../../../store';
import { View, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const { navigate } = useNavigation<any>();
  const { leadDetails } = useMyLeadStore();
  const { edit_allowed } = leadDetails;
  
  const onPress = (name: 'EditLead' | 'AddProject') => navigate(name);


  return (
    <View style={styles.container}>
      <Button
        style={styles.addbtn}
        title={'ADD PROJECT'}
        onPress={() => onPress('AddProject')}
      />
      <Button
        style={styles.editbtn}
        title={'EDIT'}
        onPress={() => onPress('EditLead')}
        hide={edit_allowed == 'Y' ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addbtn: {
    width: 145,
    marginRight: 13,
  },
  editbtn: {
    width: 145,
  },
});
