import React from 'react';
import Button from './button';
import EmployeeInfo from './employee-info';
import { Colors, moderateScale } from '../../../../../constants';
import { fontStyles } from '../../../../../styles';
import { Dots } from '../../../../../../assets/icons';
import { View, Text, StyleSheet } from 'react-native';
import { useMyProjectStore, useStartupStore } from '../../../../../store';

interface ListHeaderProps {
  setActive: (value: 'Activities' | 'Upcoming') => void,
  active: string,
  open: () => void,
  onViewTeam: () => void
}

export default ({ setActive, active, open, onViewTeam }: ListHeaderProps) => {
  const { projectDetails: data } = useMyProjectStore();
  const { data: { screens: { project_detail } = {}, edit_allowed, share_allowed } = {} } = useStartupStore();
  const { actions, call_icon, view_team, activity, upcoming_activity } = project_detail || {};

  return (
    <View style={styles.rootcontainer}>
      <View style={styles.headercontainer}>
        <Text style={styles.title}>{data.project_title}</Text>
        <Text style={styles.companyname}>{data.company_name}</Text>
        {(edit_allowed || share_allowed) &&
          actions &&
          <Text style={styles.actions} onPress={open}>
            {'actions'}
          </Text>
        }
      </View>
      <View style={styles.wrapper}>
        <EmployeeInfo title="Contact Name" value={data.contact_person!} />
        <EmployeeInfo
          title="Contact Number"
          value={`+${data.country_id} ${data.phone}`}
          call={call_icon}
        />
        <EmployeeInfo
          title="Location"
          value={
            !data.city_name || !data.state_name
              ? data.country_name
              : `${data.city_name}, ${data.state_name}`
          }
        />
        <EmployeeInfo title="Source" value={data.source} />
        <EmployeeInfo title="Type" value={data.category_name} />
        <EmployeeInfo title="Status" value={data.project_status} />
        {view_team &&
          <Text style={styles.viewteam} onPress={onViewTeam}>
            {'View Team'}
          </Text>
        }
      </View>
      {(activity || upcoming_activity) &&
        <View style={styles.bncontainer}>
          <Dots style={{ position: 'absolute', top: 0 }} />
          {activity &&
            <Button
              title={'Activities'}
              onPress={() => setActive('Activities')}
              active={active}
            />
          }
          <View style={styles.pipe} />
          {upcoming_activity &&
            <Button
              title={'Upcoming'}
              onPress={() => setActive('Upcoming')}
              active={active}
            />
          }
          <Dots />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  rootcontainer: {
    margin: moderateScale(15),
  },
  headercontainer: {
    borderBottomWidth: 4,
    borderBottomColor: Colors.lightblue,
    paddingBottom: moderateScale(16),
  },
  title: {
    textAlign: 'center',
    marginBottom: moderateScale(15),
    ...fontStyles.r7,
  },
  companyname: {
    textAlign: 'center',
    marginBottom: moderateScale(15),
    ...fontStyles.r3,
  },
  actions: {
    alignSelf: 'center',
    color: Colors.yellow,
    ...fontStyles.r3,
    textTransform: 'uppercase',
  },
  wrapper: {
    marginVertical: moderateScale(15),
  },
  viewteam: {
    ...fontStyles.r2,
    color: Colors.yellow,
    alignSelf: 'flex-end',
  },
  bncontainer: {
    flexDirection: 'row',
    paddingVertical: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pipe: {
    height: moderateScale(15),
    backgroundColor: Colors.grey,
    width: 1.8,
    position: 'absolute',
    opacity: 0.5,
  },
});
