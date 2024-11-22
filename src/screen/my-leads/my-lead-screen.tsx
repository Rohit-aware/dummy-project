import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../constants';
import { useMyLeadHook } from './my-lead-hook';
import LeadsList from './components/leads-list';
import { Header, SearchBar } from '../../components';


const MyLeads = () => {
    const {
        page,
        search,
        loading,
        refresh,
        isFinish,
        onFilter,
        onRefresh,
        leadsData,
        setSearch,
        leadsFilter,
        onEndReached,
    } = useMyLeadHook();


    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title={'My Leads'} />
            <SearchBar
                onPress={onFilter}
                onChangeText={setSearch}
                value={search}
                enabled={leadsFilter !== null ? true : false}
            />
            <LeadsList
                data={leadsData}
                onEndReached={onEndReached}
                finish={isFinish}
                loading={loading}
                onRefresh={onRefresh}
                refresh={refresh}
                page={page}
            />
        </View>
    )
};

export default MyLeads;