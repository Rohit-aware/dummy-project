import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, } from 'react-native';
import { fontStyles } from '../../../styles';
import { Colors } from '../../../constants';
import { Dots } from '../../../../assets/icons';

const SwitchButton = ({ setActive, active }: { setActive: (value: string) => void, active: string }) => {

  const changeColor = (title: string) => {
    return {
      color: active == title ? Colors.yellow : Colors.black,
    };
  };
  return (
    <>
      {true && true ? (
        <View style={styles.container}>
          <Dots style={styles.dot} />
          {true &&
            <TouchableWithoutFeedback>
              <Text
                style={[styles.title, changeColor('Personal Details')]}
                onPress={() => setActive('Personal Details')}>
                {'Personal Details'}
              </Text>
            </TouchableWithoutFeedback>
          }
          {true &&
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