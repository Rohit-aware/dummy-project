import React from 'react';
import { View, StyleSheet } from 'react-native';
import color from '../../../../constants/colors';
import { useShareLeadHook } from './share-lead-hook';
import EmployeesList from './components/employees-list';
import { Button, Header, SearchBar } from '../../../../components';

const ShareLead = ({ route }: any) => {
    const {
        page,
        teams,
        search,
        loading,
        refresh,
        onCheck,
        btnload,
        onRefresh,
        setSearch,
        shareLeads,
        onEndReached,
    } = useShareLeadHook();

    return (
        <View style={styles.root}>
            <Header title={'Share Leads'} />
            <SearchBar
                hide
                textinputStyle={styles.searchinput}
                onChangeText={setSearch}
                value={search}
            />
            <EmployeesList
                data={teams}
                page={page}
                loading={loading}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                refresh={refresh}
                onCheck={onCheck}
            />
            {teams.length > 0 && (
                <Button onPress={shareLeads} title="Share Leads" loading={btnload} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: color.white,
    },
    searchinput: {
        marginRight: 0,
    },
});
export default ShareLead;