import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';

const spacing = 15;

const ProjectBox = ({ discussion, converted }: { discussion: string, converted: string }) => {
  const navigation = useNavigation<any>();

  const onDiscussion = () => {
    // dispatch(
    //   enableProjectFilter({
    //     project_status: 'Requirement Discussion',
    //     client_id: null,
    //   }),
    // );
    navigation.navigate('MyProjects');
  };

  const onConverted = () => {
    // dispatch(
    //   enableProjectFilter({
    //     project_status: 'Converted',
    //     client_id: null,
    //   }),
    // );
    navigation.navigate('MyProjects');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onDiscussion}>
          <View style={styles.btncontainer}>
            <Text style={styles.value}>{discussion}</Text>
            <Text style={styles.title}>{'Discussion'}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onConverted}>
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