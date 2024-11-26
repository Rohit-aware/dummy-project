import React from 'react';
import LeadsCard from './lead-card';
import { useMyLeadStore, useStartupStore } from '../../../store';
import { StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Loader, BottomLoader, ListEmptyComponent } from '../../../components';

const EMPTY_IMAGE = require('../../../../assets/images/no_leads_record.png');
interface LeadsListProps {
  page: number;
  data: Array<any>;
  finish: boolean;
  refresh: boolean;
  loading: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
};

const LeadsList = ({
  page,
  data,
  finish,
  refresh,
  loading,
  onRefresh,
  onEndReached,
}: LeadsListProps) => {
  const { setLeadDetails } = useMyLeadStore();
  const { navigate } = useNavigation<any>();

  const { data: { screens: { lead_listing } = {}, edit_allowed } = {} } = useStartupStore() || {};
  const { add_project } = lead_listing || {};

  const checkForEmpty = (value: string) => {
    const isEmpty =
      value == null || value == 'undefined' || value == undefined || value == '' || value == "null"
        ? true
        : false;

    return isEmpty;
  };

  const onPress = (name: 'LeadDetails' | 'AddProject', item: any) => {
    setLeadDetails({ value: item });
    navigate(name);
  }

  return (
    <>
      {loading && page === 0 ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          refreshing={refresh}
          onRefresh={onRefresh}
          keyExtractor={(item) => item.client_id}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return loading && page !== 0 ? <BottomLoader /> : null;
          }}
          ListEmptyComponent={() => {
            return (
              <ListEmptyComponent
                image={EMPTY_IMAGE}
                title={'No Record Available'}
              />
            );
          }}
          decelerationRate="normal"
          contentContainerStyle={[styles.contentContainerStyle]}
          renderItem={({ index, item }) => {
            const {
              contact_person,
              country_id,
              phone,
              city_name,
              state_name,
              country_name,
              source,
              company_name,
            } = item;
            return (
              <LeadsCard
                add_project={add_project!}
                companyname={company_name}
                contactname={contact_person}
                contactnumber={`+${country_id} ${phone}`}
                location={
                  (checkForEmpty(state_name) || checkForEmpty(city_name) || country_id !== 91)
                    ?
                    country_name
                    :
                    `${city_name}, ${state_name}`
                }
                source={source}
                onLeadDetails={() => onPress('LeadDetails', item)}
                onAddProject={() => onPress('AddProject', item)}
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
export default LeadsList