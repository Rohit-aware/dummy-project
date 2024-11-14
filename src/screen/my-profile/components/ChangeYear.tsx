import React from 'react';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { DropDownIcon } from '../../../../assets/icons';
import { StyleSheet, View, Text, ActivityIndicator, Pressable, TouchableOpacity } from 'react-native';


export default ({ loading, year, open }: { loading: boolean, year: string, open: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>{'Select Year'}</Text>
      <TouchableOpacity onPress={open} >
        <View style={styles.wrapper}>
          <Text style={styles.year}>{year}</Text>
          <Pressable
            onPress={open}
            android_ripple={{ color: Colors.blue, borderless: true, radius: 15 }}>
            {loading ? (
              <ActivityIndicator color={Colors.blue} size={20} />
            ) : (
              <DropDownIcon />
            )}
          </Pressable>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
  },
  hint: {
    flex: 1,
    ...fontStyles.r8,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  year: {
    marginRight: 15,
    ...fontStyles.r7,
  },
});