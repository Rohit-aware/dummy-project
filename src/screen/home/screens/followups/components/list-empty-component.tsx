import React from 'react';
import { fontStyles } from '../../../../../styles';
import {View, Text, StyleSheet} from 'react-native';
import NoUpcomingActivities from '../../../../../../assets/images/NoupcomingActvities';

export default () => {
  return (
    <View style={styles.container}>
      <NoUpcomingActivities width={110} height={110} />
      <Text style={styles.text}>{'no Follow-ups found'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    marginTop: 20,
    textTransform: 'capitalize',
    ...fontStyles.r3,
  },
});
