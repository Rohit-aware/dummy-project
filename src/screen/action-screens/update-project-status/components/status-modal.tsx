import React from 'react';
import Modal from 'react-native-modal';
import { Colors } from '../../../../constants';
import { fontStyles } from '../../../../styles';
import { useCommonStore } from '../../../../store';
import { Dots } from '../../../../../assets/icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default ({ setVisible, isVisible, onChangeText, name }: any) => {
  const projectStatus = useCommonStore(state => state.projectStatus);
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropColor={'rgba(0,0,0,0)'}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <View style={styles.container}>
        {projectStatus.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                onChangeText(name, item);
                setVisible(false);
              }}>
              <View style={styles.wrapper}>
                <Text style={styles.title}>{item.project_status}</Text>
                {i != 7 && <Dots />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  wrapper: {
    paddingVertical: 13,
  },
  title: {
    marginLeft: 20,
    textTransform: 'capitalize',
    ...fontStyles.r3,
  },
});