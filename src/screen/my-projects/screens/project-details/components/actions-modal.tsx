import React from 'react';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useProjectDetailsStore, useStartupStore } from '../../../../../store';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Dots } from '../../../../../../assets/icons';
import { Colors } from '../../../../../constants';
import { fontStyles } from '../../../../../styles';



export default ({ show, details, close, hideleadbutton, hideProjectbutton }: any) => {
  const navigation = useNavigation<any>();
  const { updateProjectDetail } = useProjectDetailsStore();
  const { data: { screens: { project_detail } = {}, edit_allowed, share_allowed } = {} } = useStartupStore();
  const { share_project_action, add_activities, add_upcoming_activities, update_project_status, create_reminder } = project_detail || {};

  const data = [
    {
      title: 'Share Project',
      screen: 'ShareProject',
      isVisible: share_project_action && share_allowed
    },
    {
      title: 'Add Activites',
      screen: 'AddActivities',
      isVisible: add_activities && edit_allowed
    },
    {
      title: 'Add Upcoming Activities',
      screen: 'AddUpcomingActivities',
      isVisible: add_upcoming_activities && edit_allowed
    },
    {
      title: 'Update Project Status',
      screen: 'UpdateProjectStatus',
      isVisible: update_project_status && edit_allowed
    },
    {
      title: 'Create Reminder',
      screen: 'CreateReminder',
      isVisible: create_reminder && edit_allowed
    },
  ];

  const onItemClick = (screen: string) => {
    if (screen) {
      updateProjectDetail({ data: details });
      navigation.navigate(screen);
    }
    close()
  };
  return (
    <Modal
      isVisible={show}
      style={styles.modal}
      backdropColor={'rgba(0,0,0,0)'}
      onBackButtonPress={close}
      onBackdropPress={close}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <View style={styles.wrapper}>
        {data.map((item, i) => {
          return item.isVisible && (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => onItemClick(item.screen)}>
              {(hideleadbutton && i == 0) || (hideProjectbutton && i == 3) ? (
                <View />
              ) : (
                <View style={styles.container}>
                  <Text style={styles.title}>{item.title}</Text>
                  {i != 4 && <Dots />}
                </View>
              )}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  container: {
    paddingVertical: 15,
  },
  title: {
    ...fontStyles.r3,
    marginLeft: 40,
  },
});
