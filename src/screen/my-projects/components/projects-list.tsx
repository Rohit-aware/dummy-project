import React from 'react';
import ProjectsCard from './projects-card';
import { ProjectsListProps } from '../interface';
import { StyleSheet, FlatList, View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomLoader, ListEmptyComponent, Loader } from '../../../components';
import { ProjectDataType } from '../../../store/my-project-store/interface';
import { useMyProjectStore, useProjectDetailsStore } from '../../../store';

const EMPTY_IMAGE = require('../../../../assets/images/no_project_record.png');


const ProjectsList = ({
  page,
  data,
  loading,
  refresh,
  onRefresh,
  onEndReached,
}: ProjectsListProps) => {
  const navigation = useNavigation<any>();
  const { setProjectDetail } = useMyProjectStore();
  const { resetIsFinishPage } = useProjectDetailsStore();
  const onProjectDetail = (data: Partial<ProjectDataType>) => {
    resetIsFinishPage();
    setProjectDetail({ data });
    navigation.navigate('ProjectDetails');
  };

  return (
    <>
      {loading && page == 0 ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          refreshing={refresh}
          onRefresh={onRefresh}
          keyExtractor={(item, i) => item.project_id}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.contentContainerStyle]}
          ListFooterComponent={() => {
            return (loading && page !== 0) ? <BottomLoader /> : null;
          }}
          ListEmptyComponent={() => {
            return (
              (!loading && data?.length === 0) ? <ListEmptyComponent
                image={EMPTY_IMAGE}
                title={'No Record Available'}
              />
                : <View />
            );
          }}
          renderItem={({ item, index }) => {
            const {
              project_title,
              company_name,
              contact_person,
              country_id,
              phone,
              city_name,
              state_name,
              country_name,
              source,
              project_status,
            } = item;
            return (
              <ProjectsCard
                title={project_title}
                client={company_name}
                location={
                  (!city_name || !state_name || country_id !== 91)
                    ? country_name
                    : `${city_name}, ${state_name}`
                }
                name={contact_person}
                phonenumber={`+${country_id} ${phone}`}
                source={source}
                status={project_status}
                onProjectDetail={() => onProjectDetail(item)}
              />
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainerStyle: {
    paddingBottom: 75,
    flexGrow: 1,
  },
});
export default ProjectsList;