import React from 'react';
import { fontStyles } from '../../../../../styles';
import { File } from '../../../../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default ({ Files }: { Files: Array<any> }) => {
  const navigation = useNavigation<any>();
  return (
    <>
      {Files.map((item, i) => {
        return (
          <View style={styles.container} key={i}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FileViewer', { data: item })}>
              <File />
            </TouchableOpacity>
            <View style={styles.textwrapper}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.text}
                onPress={() => navigation.navigate('FileViewer', { data: item })}>
                {item.filename}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textwrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    ...fontStyles.r3,
    marginLeft: 10,
  },
});
