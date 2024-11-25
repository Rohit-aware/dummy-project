import React, { useState } from 'react';
import FollowupCard from './followup-card';
import { StyleSheet, FlatList } from 'react-native';
import listEmptyComponent from './list-empty-component';
import { useNavigation } from '@react-navigation/native';
import { BottomLoader, Loader } from '../../../../../components';

interface FollowUpListProps {
  data: Array<any>
  page: number;
  refresh: boolean;
  loading: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
};

export default ({
  data,
  page,
  loading,
  refresh,
  onRefresh,
  onEndReached,
}: FollowUpListProps) => {
  const navigation = useNavigation<any>();
  const [loader, setLoader] = useState(false);

  const onShowLeadDetail = async (client_id: string | number) => {
    setLoader(true);
    try {
      navigation.navigate('LeadDetails');
    } catch (error) {
      console.log(error);
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
          keyExtractor={(item, i) => i.toString()}
          onRefresh={onRefresh}
          refreshing={refresh}
          ListFooterComponent={() =>
            loading && page !== 0 ? <BottomLoader /> : null
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={listEmptyComponent}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => {
            const { contact_person, created_on, company_name, client_id } = item;
            return (
              <FollowupCard
                companyname={company_name}
                contactperson={contact_person}
                date={created_on}
                onShowLeadDetail={() => onShowLeadDetail(client_id)}
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
