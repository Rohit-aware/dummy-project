import React from 'react';
import { fontStyles } from '../../../../styles';
import { Dots } from '../../../../../assets/icons';
import { StyleSheet, View, Text } from 'react-native';
import { useProjectDetailsStore } from '../../../../store';

export default () => {
  const { projectDetail: { project_title, company_name } } = useProjectDetailsStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project_title}</Text>
      <Text style={styles.companyname}>{company_name}</Text>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    marginHorizontal: 15,
  },
  title: {
    textAlign: 'center',
    marginBottom: 14,
    ...fontStyles.r7,
  },
  companyname: {
    textAlign: 'center',
    marginBottom: 15,
    ...fontStyles.r3,
  },
});