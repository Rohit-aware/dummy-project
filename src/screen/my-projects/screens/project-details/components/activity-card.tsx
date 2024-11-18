import React from 'react';
import UserFiles from './user-files';
import { fontStyles } from '../../../../../styles';
import { View, Text, StyleSheet } from 'react-native';
import { DottedLine } from '../../../../../../assets/icons';
import { RadioButton, useToggleText } from '../../../../../components';

interface ActivityCardProps {
  title: string;
  Files: Array<any>;
  remark: string;
  showdots: boolean;
  datetime: string;
}

export default ({ title, datetime, remark, Files, showdots }: ActivityCardProps) => {
  const { ToggleText, textToShow } = useToggleText({ input: remark, maxLength: 70 });
  return (
    <View style={styles.root}>
      <View style={styles.leftcontainer}>
        <RadioButton />
        {showdots && (
          <View style={styles.linecontainer}>
            <DottedLine />
          </View>
        )}
      </View>

      <View style={styles.rightcontainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.datetime}>{datetime}</Text>
        <Text style={styles.remark}>{textToShow}</Text>
        {ToggleText}
        <UserFiles Files={Files} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  leftcontainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  linecontainer: {
    position: 'absolute',
    top: 0,
  },
  rightcontainer: {
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    ...fontStyles.r8,
  },
  datetime: {
    ...fontStyles.r9,
    marginTop: 10,
  },
  remark: {
    ...fontStyles.r3,
    marginTop: 15,
    marginBottom: 10,
  },
});