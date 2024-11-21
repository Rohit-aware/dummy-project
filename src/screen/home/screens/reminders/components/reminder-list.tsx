import React from 'react';
import RemindersCard from './reminders-card';
import { FlatList, StyleSheet } from 'react-native';
import listEmptyComponent from './list-empty-component';
import { useNavigation } from '@react-navigation/native';
import { useUpdateProjectDetail } from '../../../../../hooks';
import { BottomLoader, Loader } from '../../../../../components';
import { useProjectDetailsStore } from '../../../../../store';
interface RemindersListProps {
  data: Array<any>,
  page: number,
  refresh: boolean,
  loading: boolean,
  onRefresh: () => void,
  onEndReached: () => void,
}

export default ({
  data,
  page,
  onEndReached,
  onRefresh,
  refresh,
  loading,
}: RemindersListProps) => {
  const [loader, setLoader] = React.useState(false);
  const { updateProjectDetail } = useUpdateProjectDetail();
  const { navigate } = useNavigation<any>();
  const { resetIsFinishPage } = useProjectDetailsStore();

  const showProjectDetail = async (project_id: string) => {
    setLoader(true);
    let result = await updateProjectDetail(project_id);
    if (result) {
      resetIsFinishPage();
      navigate('ProjectDetails');
    }
    setLoader(false);
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
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.container}
          ListEmptyComponent={listEmptyComponent}
          keyExtractor={(item) => item.reminder_id}
          ListFooterComponent={() => {
            return loading && page !== 0 ? <BottomLoader /> : null;
          }}
          renderItem={({ item }) => {
            const { title, reminder_time, description, project_id } = item;
            return (
              <RemindersCard
                time={reminder_time}
                title={title}
                description={description}
                showProjectDetail={() => showProjectDetail(project_id)}
              />
            );
          }}
        />
      )}

      {loader && <BottomLoader />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
