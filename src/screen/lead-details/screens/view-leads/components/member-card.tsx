import React from 'react';
import {StyleSheet, View} from 'react-native';
import InfoContainer from './info-container';

export default ({name, phone, designation, isCreator}:any) => {
  return (
    <View style={styles.container}>
      <InfoContainer title={'Employee Name'} value={name} />
      <InfoContainer
        title={'Contact Number'}
        value={phone}
        showIcon={isCreator}
      />
      <InfoContainer title={'Designation'} value={designation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingVertical: 15,
  },
});
