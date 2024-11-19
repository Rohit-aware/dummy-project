import React from 'react';
import { fontStyles } from '../../../../styles';
import { Dots } from '../../../../../assets/icons';
import { View, Text, StyleSheet } from 'react-native';
import { useProjectDetailsStore } from '../../../../store';

export default () => {
  const { projectDetail: { project_title, company_name } } = useProjectDetailsStore();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project_title}</Text>
      <Text style={styles.title}>{company_name}</Text>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    marginHorizontal: 15,
    paddingVertical: 15
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    ...fontStyles.r7,
  },
  companyname: {
    textAlign: 'center',
    ...fontStyles.r3,
  },
});


