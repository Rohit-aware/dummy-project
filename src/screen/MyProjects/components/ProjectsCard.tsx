import React from 'react';
import Details from './Details';
import { fontStyles } from '../../../styles';
import { Dots } from '../../../../assets/icons';
import { ProjectsCardProps } from '../interface';
import { View, Text, StyleSheet, TouchableWithoutFeedback, } from 'react-native';

const ProjectsCard = ({
  client,
  name,
  title,
  source,
  status,
  location,
  phonenumber,
  onProjectDetail
}: ProjectsCardProps) => {
  return (
    <TouchableWithoutFeedback onPress={onProjectDetail}>
      <View style={styles.container}>
        <Text style={[styles.title]}>{title}</Text>
        <Details title={'Client'} value={client} />
        <Details title={'Contact Name'} value={name} />
        <Details title={'Contact Number'} value={phonenumber} />
        <Details title={'Location'} value={location} />
        <Details title={'Source'} value={source} />
        <Details title={'Status'} value={status} />
        <Dots />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    flex: 1,
    marginBottom: 15,
    ...fontStyles.r8,
  },
});
export default ProjectsCard