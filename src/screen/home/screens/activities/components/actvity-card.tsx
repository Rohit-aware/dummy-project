import React from 'react';
import { Colors } from '../../../../../constants';
import { fontStyles } from '../../../../../styles';
import { Dots } from '../../../../../../assets/icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ActivityCardProps {
  type: string,
  time: string,
  title: string,
  showlink: boolean,
  companyname: string,
  onJoinMeeting: any,
  showProjectDetail: () => void,
}

export default ({
  type,
  time,
  title,
  showlink,
  companyname,
  onJoinMeeting,
  showProjectDetail,
}: ActivityCardProps) => {
  return (
    <TouchableOpacity onPress={showProjectDetail}>
      <View style={styles.wrapper}>
        <Dots style={styles.dot} />
        <View style={styles.container}>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.box}>
          <Text style={styles.companyname}>{companyname}</Text>
          {showlink && (
            <Text style={styles.url} onPress={onJoinMeeting}>
              {'Join Meeting'}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 15,
    paddingBottom: 25,
    marginHorizontal: 15,
  },
  dot: {
    top: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  type: {
    flex: 1,
    marginRight: 15,
    ...fontStyles.r8,
  },
  time: {
    ...fontStyles.r9,
    alignSelf: 'flex-end',
  },
  title: {
    marginTop: 12,
    ...fontStyles.r2,
  },
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    alignItems: 'center',
  },
  companyname: {
    ...fontStyles.r2,
    flex: 1,
  },
  url: {
    flex: 1,
    textAlign: 'right',
    color: Colors.yellow,
    zIndex: 10,
    ...fontStyles.r3,
  },
});