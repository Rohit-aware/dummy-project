import React from 'react';
import ActvityCard from './actvity-card';
import { useNavigateHelper } from '../../../../../hooks';
import { StyleSheet, FlatList, Linking } from 'react-native';
import { useProjectDetailsStore } from '../../../../../store';
import { BottomLoader, ListEmptyComponent, Loader, showToast } from '../../../../../components';

interface ActivityListProps {
  data: Array<any>
  page: number;
  refresh: boolean;
  loading: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
}

export default ({
  data,
  page,
  refresh,
  loading,
  onRefresh,
  onEndReached,
}: ActivityListProps) => {

  const { navigate: navigateToProjectDetails } = useNavigateHelper();
  const [loader, setLoader] = React.useState(false);
  const { resetIsFinishPage } = useProjectDetailsStore();

  const onJoinMeeting = async (url: string) => {
    try {
      Linking.openURL(url).catch(error => showToast(`Error: ${error.message}`));
    } catch (error) {
      console.log('error inisde onJoinMeeting : ', error)
    }
  };

  const showProjectDetail = async (project_id: string) => {
    setLoader(true);
    resetIsFinishPage();
    await navigateToProjectDetails('ProjectDetails', project_id);
    setLoader(false);
  };

  return (
    <>
      {loading && page == 0 ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, i) => `${item.activity_id}`}
          contentContainerStyle={styles.container}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          refreshing={refresh}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={() => {
            return loading && page !== 0 ? <BottomLoader /> : null;
          }}
          renderItem={({ item, index }) => {
            const {
              activity_type,
              activity_time,
              activity_title,
              company_name,
              url,
              project_id,
            } = item;
            return (
              <ActvityCard
                type={
                  activity_type == 'f2f' ? 'Client Meeting' : 'Online Meeting'
                }
                time={activity_time}
                title={activity_title}
                companyname={company_name}
                showlink={url === '' ? false : true}
                onJoinMeeting={() => onJoinMeeting(url)}
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
