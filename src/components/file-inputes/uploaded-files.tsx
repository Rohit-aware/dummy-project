import React from 'react';
import { Colors } from '../../constants';
import { fontStyles } from '../../styles';
import { File } from '../../../assets/icons';
import { View, Text, StyleSheet } from 'react-native';

export default ({ data, setFiles }: { data: Array<any>, setFiles: (item: any) => void }) => {
  return (
    <>
      {data.map((item, index) => {
        const onRemove = () => {
          let newData = data.filter((item, i) => {
            if (i !== index) {
              return item;
            }
          });
          setFiles(newData);
        };
        return (
          <View style={styles.fileupload} key={index}>
            <File />
            <Text
              style={styles.filename}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item['name']}
            </Text>
            <Text style={styles.remove} onPress={onRemove}>
              {'Remove'}
            </Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  fileupload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  filename: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    ...fontStyles.r3,
  },
  remove: {
    color: Colors.red,
    ...fontStyles.r3,
  },
});
