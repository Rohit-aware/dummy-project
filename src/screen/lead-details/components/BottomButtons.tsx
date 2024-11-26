import React from 'react';
import { Button } from '../../../components';
import { View, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyLeadStore, useStartupStore } from '../../../store';

export default () => {
  const { navigate } = useNavigation<any>();
  const { leadDetails } = useMyLeadStore();
  const { edit_allowed } = leadDetails;
  const { data: { screens, edit_allowed: edit_allowedStartup } } = useStartupStore() || {};
  const { add_project, edit_lead } = screens?.lead_detail || {}

  const onPress = (name: 'EditLead' | 'AddProject') => navigate(name);


  return (
    <View style={styles.container}>
      {(add_project && edit_allowedStartup) &&
        <Button
          style={styles.addbtn}
          title={'ADD PROJECT'}
          onPress={() => onPress('AddProject')}
        />
      }
      {(edit_lead && edit_allowedStartup) &&
        <Button
          style={styles.editbtn}
          title={'EDIT'}
          onPress={() => onPress('EditLead')}
          hide={edit_allowed == 'Y' ? false : true}
        />
      }
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
