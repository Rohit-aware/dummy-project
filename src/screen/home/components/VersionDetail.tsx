import React from 'react';
import { Text, StyleSheet, } from 'react-native';
import deviceInfo from 'react-native-device-info';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';

const VersionDetail= () => {
  return (
    <>
      <Text style={styles.title}>Organize Leads</Text>
      <Text style={styles.version}>Version {deviceInfo.getVersion()}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: Colors.thickGrey,
    marginTop: 10,
    ...fontStyles.p1,
  },
  version: {
    textAlign: 'center',
    color: Colors.thickGrey,
    marginBottom: 20,
    ...fontStyles.m1,
  },
});
export default VersionDetail;