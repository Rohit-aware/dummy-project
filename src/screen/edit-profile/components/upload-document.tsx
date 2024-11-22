import React from 'react';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { File } from '../../../../assets/icons';
import { View, StyleSheet, Text } from 'react-native';

export default ({ filename, placeholder, onUpload }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.filecontainer}>
        {filename !== '' && (
          <File width={15} height={15} style={styles.fileicon} />
        )}
        <Text
          style={styles.filetext}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
          {filename == '' ? placeholder : filename}
        </Text>
      </View>

      <Text style={styles.button} onPress={onUpload}>
        {filename == '' ? 'upload' : 'change/upload'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  filecontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  fileicon: {
    marginRight: 10,
  },
  filetext: {
    flex: 1,
    ...fontStyles.r3,
  },
  button: {
    ...fontStyles.r3,
    color: Colors.yellow,
    marginLeft: 20,
  },
});
