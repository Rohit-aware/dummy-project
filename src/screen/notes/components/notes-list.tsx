import React from 'react';
import NotesCard from './notes-card';
import { StyleSheet, FlatList, } from 'react-native';
import { BottomLoader, ListEmptyComponent, Loader } from '../../../components';

const EMPTY_IMG = require('../../../../assets/images/no_project_record.png');
const EMPTY_MSG = 'No Record Available';


type NotesListProps = {
  data: Array<any>,
  page: number,
  finish: boolean,
  refresh: boolean,
  loading: boolean,
  onRefresh: () => void,
  onEndReached: () => void,
};

export default ({
  data,
  loading,
  page,
  finish,
  onEndReached,
  onRefresh,
  refresh,
}: NotesListProps) => {
  
  return (
    <>
      {page === 0 && loading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, i) => i.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          refreshing={refresh}
          onRefresh={onRefresh}
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponent={() =>
            data.length > 0 && !finish ? <BottomLoader /> : null
          }
          ListEmptyComponent={() => (
            <ListEmptyComponent image={EMPTY_IMG} title={EMPTY_MSG} />
          )}
          renderItem={({ item, index }) => {
            const { created_by_name, call_status, created_on, notes } = item;
            return (
              <NotesCard
                name={created_by_name}
                status={call_status}
                date={created_on}
                notes={notes}
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
