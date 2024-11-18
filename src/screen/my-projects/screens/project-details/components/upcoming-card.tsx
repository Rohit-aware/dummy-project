import React from 'react';
import { Colors } from '../../../../../constants';
import { fontStyles } from '../../../../../styles';
import { View, Text, StyleSheet } from 'react-native';
import { useToggleText } from '../../../../../components';

interface UpcomingCardProps {
  type: 'Client Meeting' | 'Online Meeting';
  time: string;
  agenda: string;
  address: string;
  url: string;
  onPress: () => void;
}

export default ({ type, time, agenda, address, url, onPress }: UpcomingCardProps) => {
  const { ToggleText, textToShow } = useToggleText({ input: address, maxLength: 60 });
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.type}>{type}</Text>
        {url && <Text style={styles.link} onPress={onPress}>{'Join Meeting'}</Text>}
      </View>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{'Agenda'}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{agenda}</Text>
      </View>
      {type === 'Client Meeting' &&
        <View>
          <View style={styles.wrapper}>
            <Text style={styles.title}>{'Address'}</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{textToShow}</Text>
          </View>
          {ToggleText}
        </View>
      }
      <View style={styles.bottomline} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    marginHorizontal: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    ...fontStyles.r8,
  },
  link: {
    color: Colors.yellow,
    ...fontStyles.r8,
  },
  time: {
    marginTop: 15,
    textAlign: 'left',
    ...fontStyles.r9,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  title: {
    ...fontStyles.r2,
    width: 110,
  },
  colon: {
    marginHorizontal: 10,
    ...fontStyles.r2,
  },
  value: {
    flex: 1,
    ...fontStyles.r2,
    textAlign: 'left'
  },
  bottomline: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.6,
    opacity: 0.3,
  },

});