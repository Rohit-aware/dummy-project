import React from 'react';
import { fontStyles } from '../../../styles';
import { Colors } from '../../../constants';
import { Dots } from '../../../../assets/icons';
import { StyleSheet, View, Text, TouchableWithoutFeedback, } from 'react-native';
import { useStartupStore } from '../../../store';

const SwitchButton = ({ setActive, active }: { setActive: (value: string) => void, active: string }) => {
  const { data: { screens: { profile: { profile_details, work_overview } = {} } = {} } } = useStartupStore() || {};

  const changeColor = (title: string) => {
    return {
      color: active == title ? Colors.yellow : Colors.black,
    };
  };
  return (
    <>
      {work_overview && profile_details ? (
        <View style={styles.container}>
          <Dots style={styles.dot} />
          {profile_details &&
            <TouchableWithoutFeedback>
              <Text
                style={[styles.title, changeColor('Personal Details')]}
                onPress={() => setActive('Personal Details')}>
                {'Personal Details'}
              </Text>
            </TouchableWithoutFeedback>
          }
          {work_overview &&
            <TouchableWithoutFeedback>
              <Text
                style={[styles.title, changeColor('Work Overview')]}
                onPress={() => setActive('Work Overview')}>
                {'Work Overview'}
              </Text>
            </TouchableWithoutFeedback>
          }
          <View style={styles.separator} />
          <Dots />
        </View>
      ) : (
        <View />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15
  },
  title: {
    flex: 1,
    textAlign: 'center',
    ...fontStyles.r7,
  },
  dot: {
    position: 'absolute',
    top: 0,
  },
  separator: {
    height: 15,
    backgroundColor: Colors.grey,
    width: 1.8,
    position: 'absolute',
    opacity: 0.5,
  },
});
export default SwitchButton;