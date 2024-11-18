import React from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import color from '../../../constants/color';
import fonts from '../../../constants/fonts';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/core';
import Dots from '../../../assets/icons/dots';
import {updateProjectDetail} from '../../../redux/slice/Activities';
import {useDispatch, useSelector} from 'react-redux';



export default ({show, details, close, hideleadbutton, hideProjectbutton}) => {
  const navigation = useNavigation();
  const { data: { screens: { project_detail } = {}, edit_allowed, share_allowed } = {} } = useSelector((state) => state.startupSlice) || {};
  const { share_project_action,add_activities,add_upcoming_activities,update_project_status,create_reminder } =project_detail || {};

  const data = [
    {
      title: 'Share Project',
      screen: 'ShareProject',
      isVisible:share_project_action && share_allowed
    },
    {
      title: 'Add Activites',
      screen: 'AddActivities',
      isVisible:add_activities && edit_allowed
    },
    {
      title: 'Add Upcoming Activities',
      screen: 'AddUpcomingActivities',
      isVisible:add_upcoming_activities && edit_allowed
    },
    {
      title: 'Update Project Status',
      screen: 'UpdateProjectStatus',
      isVisible:update_project_status && edit_allowed
    },
    {
      title: 'Create Reminder',
      screen: 'CreateReminder',
      isVisible:create_reminder && edit_allowed
    },
  ];
  
  const dispatch = useDispatch();
  const onItemClick = screen => {
    if (screen) {
      dispatch(updateProjectDetail(details));
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
    backgroundColor: color.white,
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
    ...fonts.r3,
    marginLeft: 40,
  },
});
