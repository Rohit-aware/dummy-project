import React from 'react';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import { useMyProjectStore, useReloadStore } from '../../../store';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const spacing = 15;

const ProjectBox = ({ discussion, converted }: { discussion: string, converted: string }) => {
  const navigation = useNavigation<any>();
  const { reloadPage } = useReloadStore();
  const { enableProjectFilter, resetProjectsData } = useMyProjectStore();
  const handlePress = (status: 'Requirement Discussion' | 'Converted') => {
    reloadPage();
    resetProjectsData();
    enableProjectFilter({
      project_status: status,
      client_id: null,
    }),
      navigation.navigate('MyProjects');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => handlePress('Requirement Discussion')}>
          <View style={styles.btncontainer}>
            <Text style={styles.value}>{discussion}</Text>
            <Text style={styles.title}>{'Discussion'}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress('Converted')}>
          <View style={styles.btncontainer}>
            <Text style={styles.value}>{converted}</Text>
            <Text style={styles.title}>{'Converted'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.heading}>{'Projects'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    marginHorizontal: spacing,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 15,
    borderRadius: 10,
    paddingVertical: spacing,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btncontainer: {
    flex: 1,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  value: {
    ...fontStyles.r6,
    textAlign: 'center',
  },
  title: {
    ...fontStyles.r3,
    marginTop: 12,
  },
  heading: {
    textAlign: 'center',
    marginTop: 3,
    color: Colors.lightblue,
    ...fontStyles.r7,
  },
});
export default React.memo(ProjectBox);