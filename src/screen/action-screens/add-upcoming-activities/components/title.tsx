import React from 'react';
import { fontStyles } from '../../../../styles';
import { Dots } from '../../../../../assets/icons';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../../../../constants';
import { useProjectDetailsStore } from '../../../../store';

export default () => {
  const { project_title, company_name } = useProjectDetailsStore(state => state.projectDetail,);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project_title}</Text>
      <Text style={styles.comapanyname}>{company_name}</Text>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(15),
    marginHorizontal: moderateScale(15),
  },
  title: {
    textAlign: 'center',
    marginBottom: moderateScale(14),
    ...fontStyles.r7,
  },
  comapanyname: {
    textAlign: 'center',
    ...fontStyles.r3,
  },
});