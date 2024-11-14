import React from 'react';
import { helpers } from '../../../utility';
import { fontStyles } from '../../../styles';
import { useProfileStore } from '../../../store';
import { View, StyleSheet, Text } from 'react-native';

export default () => {
  const { checkForEmpty } = helpers;
  const { personalDetails } = useProfileStore();
  const { first_name, last_name, phone_code, phone, email } = personalDetails;

  const username = checkForEmpty(first_name)
    ? '-'
    : `${first_name}  ${last_name}`;
  const usernumber = checkForEmpty(phone) ? '-' : `+${phone_code} ${phone}`;
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.usernumber}>{usernumber}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  username: {
    ...fontStyles.r10,
  },
  usernumber: {
    opacity: 0.7,
    marginTop: 8,
    ...fontStyles.r3,
  },
  email: {
    opacity: 0.7,
    marginTop: 8,
    ...fontStyles.r3,
  },
});
