import React from 'react';
import { Linking } from 'react-native';
import UpcomingCard from './upcoming-card';
import { showToast } from '../../../../../components';


const RenderUpcActivityList = ({ item, index }: { item: any, index: number }) => {
  const { activity_type, address, agenda, url, activity_time, activity_date } = item;
  const onClickOfLink = async () => {
    try {
      Linking.openURL(url);
    } catch (error) {
      showToast("Don't know how to open this type of url !!!");
    }
  };
  return (
    <UpcomingCard
      type={
        activity_type == 'f2f' ? 'Client Meeting' : 'Online Meeting'
      }
      address={address}
      agenda={agenda}
      url={url !== '' ? url : false}
      time={activity_date + ' - ' + activity_time}
      onPress={onClickOfLink}
    />
  );
};
export default RenderUpcActivityList