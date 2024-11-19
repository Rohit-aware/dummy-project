import React from 'react';
import DetailCard from './detail-card';
import { StyleSheet, FlatList } from 'react-native';
import ItemSeparatorComponent from './item-separator-component';
import { BottomLoader, ListEmptyComponent, Loader } from '../../../../components';

const EMPTY_IMG = require('../../../../../assets/images/no_leads_record.png');
const EMPTY_MSG = 'No Team Member Found';

type DataType = {
  user_id: string;
  name: string;
  phone: string;
  designation: string;
  email: string;
}

interface EmployeesListProps {
  data: Array<DataType>;
  page: number;
  loading: boolean;
  refresh: boolean;
  onCheck: (user_id: string) => void;
  onRefresh: () => void;
  onEndReached: () => void;
}
export default ({
  data,
  page,
  loading,
  refresh,
  onRefresh,
  onEndReached,
  onCheck,
}: EmployeesListProps) => {
  return (
    <>
      {page == 0 && loading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, i) => i.toString()}
          onEndReached={onEndReached}
          refreshing={refresh}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponent={() =>
            loading && page !== 0 ? <BottomLoader /> : null
          }
          ListEmptyComponent={() => (
            <ListEmptyComponent image={EMPTY_IMG} title={EMPTY_MSG} />
          )}
          ItemSeparatorComponent={ItemSeparatorComponent}
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
