import React from 'react';
import { Button } from '../../../components';
import { useMyLeadStore } from '../../../store';
import { View, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const navigation = useNavigation<any>();
  const { leadDetails } = useMyLeadStore();
  const { edit_allowed } = leadDetails;
  const onAddProject = () => navigation.navigate('AddProject');
  const onEdit = () => navigation.navigate('EditLead');

  return (
    <View style={styles.container}>
      <Button
        style={styles.addbtn}
        title={'ADD PROJECT'}
        onPress={onAddProject}
      />
      <Button
        style={styles.editbtn}
        title={'EDIT'}
        onPress={onEdit}
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
