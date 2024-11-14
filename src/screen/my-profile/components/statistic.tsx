import React from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, TextStyle } from 'react-native';
import { fontStyles } from '../../../styles';
import { Colors } from '../../../constants';
import { useProfileStore } from '../../../store';

const Statistic = ({ }) => {
  const { achieved, target } = useProfileStore();
  const changeAlignment = (index: number) => {
    return {
      textAlign: index == 0 ? 'left' : index == 1 ? 'center' : 'right',
    } as TextStyle;
  };

  const headers = ['Month', 'Target', 'Acheived'];
  return (
    <ScrollView horizontal contentContainerStyle={styles.contentContainerStyle}>
      <FlatList
        data={achieved}
        keyExtractor={(_, i) => i.toString()}
        ListHeaderComponent={() => {
          return (
            <View style={styles.wrapper}>
              {headers.map((item: any, i: number) => {
                return (
                  <View key={i} style={styles.smallcontainer}>
                    <Text style={[styles.title, changeAlignment(i)]}>
                      {item}
                    </Text>
                    {i == 1 && (
                      <>
                        <View style={styles.pipe1} />
                        <View style={styles.pipe2} />
                      </>
                    )}
                  </View>
                );
              })}
              <View style={styles.line} />
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          let month = '';
          let achievedtarget = '';

          for (let i in item) {
            month = i;
            achievedtarget = item[i];
          }
          return (
            <View style={styles.container}>
              <Text style={styles.month}>{month}</Text>
              <Text style={styles.target}>{target}</Text>
              <Text style={styles.target}>{achievedtarget}</Text>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
  },
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  month: {
    textTransform: 'uppercase',
    flex: 1,
    ...fontStyles.r3,
  },
  target: {
    textTransform: 'capitalize',
    flex: 1,
    textAlign: 'center',
    ...fontStyles.r3,
  },
  wrapper: {
    flexDirection: 'row',
    paddingBottom: 25,
  },
  pipe1: {
    position: 'absolute',
    left: 0,
    borderLeftWidth: 2,
    borderLeftColor: Colors.grey,
    height: 15,
    opacity: 0.5,
  },
  pipe2: {
    position: 'absolute',
    right: 0,
    borderLeftWidth: 2,
    borderLeftColor: Colors.grey,
    height: 15,
    opacity: 0.5,
  },
  smallcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...fontStyles.r3,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1.7,
    opacity: 0.5,
    width: '100%',
  },
});
export default Statistic;