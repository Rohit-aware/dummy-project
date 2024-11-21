import React from 'react';
import ActvityCard from './actvity-card';
import { useNavigation } from '@react-navigation/native';
import ListEmptyComponent from './list-empty-component';
import { updateProjectDetail } from '../../../../../hooks';
import { View, StyleSheet, FlatList, Linking } from 'react-native';
import { BottomLoader, Loader, showToast } from '../../../../../components';

export default ({
  data,
  page,
  refresh,
  onEndReached,
  onRefresh,
  loading,
}: any) => {
  const { navigate } = useNavigation<any>();
  const [loader, setLoader] = React.useState(false);

  const onJoinMeeting = async (url: string) => {
    try {
      Linking.openURL(url).catch(error => showToast(`Error: ${error.message}`));
    } catch (error) {
      console.log('error inisde onJoinMeeting : ', error)
    }
  };

  const showProjectDetail = async (project_id: string) => {
    setLoader(true);
    const result = await updateProjectDetail(project_id);
    if (result) {
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
          keyExtractor={(item, i) => `${item.activity_id}`}
          contentContainerStyle={styles.container}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          onRefresh={onRefresh}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
