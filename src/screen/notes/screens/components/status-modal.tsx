import React from 'react';
import Modal from 'react-native-modal';
import { Colors } from '../../../../constants';
import { fontStyles } from '../../../../styles';
import { Dots } from '../../../../../assets/icons';
import { useCommonStore } from '../../../../store';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default ({ show, close, onSelect }: { show: boolean, close: () => void, onSelect: (name: 'call_status', data: any) => void }) => {
  const { call_status } = useCommonStore();

  const onItemClick = (data: any) => {
    onSelect('call_status', data);
    close();
  };
  return (
    <Modal
      isVisible={show}
      style={styles.modal}
      backdropOpacity={0.1}
      useNativeDriver={true}
      onBackdropPress={close}
      onBackButtonPress={close}
      // backdropColor={'rgba(0,0,0,0)'}
      useNativeDriverForBackdrop={true}>
      <View style={styles.container}>
        {call_status.map((item, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => onItemClick(item)}>
              <View style={styles.wrapper}>
                <Text style={styles.title}>{item.value}</Text>
                {call_status.length != i + 1 && <Dots />}
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
    ...fontStyles.r3,
    marginLeft: 20,
    textTransform: 'capitalize',
  },
});
