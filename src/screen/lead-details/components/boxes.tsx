import React from 'react';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { Dots } from '../../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useMyLeadStore, useMyProjectStore } from '../../../store';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';

export default () => {
  const { navigate } = useNavigation<any>();
  const { leadDetails } = useMyLeadStore();
  const { project_count, closed_projects, client_id } = leadDetails;
  const { enableProjectFilter, resetProjectsData } = useMyProjectStore();

  const onClick = (project_status: string | null) => {
    resetProjectsData();
    enableProjectFilter({
      project_status,
      client_id,
    }),
      navigate('BottomTab', { screen: 'MyProjects' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onClick(null)} style={styles.leftbox}>
        <Text style={styles.projectcount}>{project_count}</Text>
        <Text style={styles.projecttitle}>{'Projects'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClick('Converted')} style={styles.rightbox}>
        <Text style={styles.convertedcount}>{closed_projects}</Text>
        <Text style={styles.convertedtitle}>{'Converted'}</Text>
      </TouchableOpacity>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 25,
    justifyContent: 'space-between',
  },
  leftbox: {
    flex: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.blue,
    marginRight: 25,
  },
  projectcount: {
    marginBottom: 10,
    ...fontStyles.r11,
    color: Colors.white,
  },
  projecttitle: {
    ...fontStyles.r12,
    color: Colors.white,
  },
  convertedcount: {
    marginBottom: 10,
    ...fontStyles.r11,
    color: Colors.black,
  },
  convertedtitle: {
    ...fontStyles.r12,
    color: Colors.black,
  },
  rightbox: {
    marginRight: 5,
    flex: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
});