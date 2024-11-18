import React from 'react';
import MemberCard from './member-card';
import ItemSepartor from './item-separtor';
import { StyleSheet, FlatList } from 'react-native';
import { BottomLoader, ListEmptyComponent, Loader } from '../../../../../components';

const EMPTY_IMG = require('../../../../../../assets/images/no_leads_record.png');
const EMPTY_MSG = 'No Record Available';

interface MembersListProps {
  page: number,
  data: Array<any>,
  refresh: boolean,
  loading: boolean,
  onRefresh: () => void,
  onEndReached: () => void,
}

export default ({
  page,
  data,
  refresh,
  loading,
  onRefresh,
  onEndReached,
}: MembersListProps) => {
  return (
    <>
      {page == 0 && loading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, i) => item.user_id}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          onRefresh={onRefresh}
          refreshing={refresh}
          ListEmptyComponent={() => <ListEmptyComponent image={EMPTY_IMG} title={EMPTY_MSG} />}
          ItemSeparatorComponent={() => <ItemSepartor />}
          ListFooterComponent={() =>
            page !== 0 && loading ? <BottomLoader /> : null
          }
          renderItem={({ item, index }) => {
            const {
              first_name,
              last_name,
              phone_code,
              phone,
              creator_flag,
              designation,
            } = item;
            return (
              <MemberCard
                name={`${first_name} ${last_name}`}
                phone={`+${phone_code} ${phone}`}
                designation={designation}
                isCreator={creator_flag == 'Y' ? true : false}
              />
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1
  }
});
