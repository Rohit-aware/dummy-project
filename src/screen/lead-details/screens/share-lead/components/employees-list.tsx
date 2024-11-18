import React from 'react';
import DetailCard from './detail-card';
import { Dots } from '../../../../../../assets/icons';
import { FlatList, StyleSheet, View } from 'react-native';
import { BottomLoader, ListEmptyComponent, Loader } from '../../../../../components';

const EMPTY_IMG = require("../../../../../../assets/images/no_leads_record.png")
const EMPTY_MSG = "No Team Member Found"

interface EmployeeListProps {
  page: number,
  loading: boolean,
  refresh: boolean,
  data: Array<any>,
  onRefresh: () => void,
  onEndReached: () => void,
  onCheck: (user_id: string) => void,
}

export default ({
  data,
  page,
  onCheck,
  loading,
  refresh,
  onRefresh,
  onEndReached,
}: EmployeeListProps) => {
  return (
    <>
      {page == 0 && loading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          refreshing={refresh}
          onRefresh={onRefresh}
          keyExtractor={(item, i) => item.user_id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={() => <ListEmptyComponent image={EMPTY_IMG} title={EMPTY_MSG} />}
          ListFooterComponent={() => {
            return page !== 0 && loading ? <BottomLoader /> : null;
          }}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 15 }}><Dots /></View>}
          renderItem={({ item, index }) => {
            const { designation, name, phone, user_id } = item;
            return (
              <DetailCard
                designation={designation}
                name={name}
                phone={phone}
                onCheck={() => onCheck(user_id)}
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
    flexGrow: 1,
  },
});
