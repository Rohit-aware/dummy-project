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
      <Text style={styles.name}>{company_name}</Text>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    marginHorizontal: 15,
    marginBottom: 20
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    ...fontStyles.r7,
  },
  name: {
    textAlign: 'center',
    marginBottom: 15,
    ...fontStyles.r3,
  },
});