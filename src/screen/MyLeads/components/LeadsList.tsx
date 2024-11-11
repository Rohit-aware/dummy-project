import React from 'react';
import LeadsCard from './LeadsCard';
import { StyleSheet, FlatList } from 'react-native';
import { Loader, BottomLoader } from '../../../components';

const EMPTY_IMAGE = require('../../../assets/images/no_leads_record.png');
const LeadsList = ({
  data,
  onEndReached,
  finish,
  loading,
  refresh,
  onRefresh,
  page,
}: any) => {
  const checkForEmpty = (value: any) => {
    const isEmpty =
      value == null || value == 'undefined' || value == undefined || value == '' || value == "null"
        ? true
        : false;

    return isEmpty;
  };


  const onLeadDetails = (data: any) => {
    // dispatch(getMyLeadsDetail(data));
    // navigation.navigate('LeadDetails');
  };

  const onAddProject = (data: any) => {
    // dispatch(getMyLeadsDetail(data));
    // navigation.navigate('AddProject');
  };

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
                add_project={true}
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
                onLeadDetails={() => onLeadDetails(item)}
                onAddProject={() => onAddProject(item)}
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