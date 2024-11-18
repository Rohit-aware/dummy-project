import React from 'react'
import { Colors } from '../../../../constants';
import { Header } from '../../../../components';
import { StyleSheet, View } from 'react-native';
import { useViewLeadHook } from './view-lead-hook';
import MembersList from './components/members-list';

const ViewLead = () => {

    const {
        page,
        team,
        refresh,
        loading,
        onRefresh,
        onEndReached,
    } = useViewLeadHook();

    return (
        <View style={styles.root}>
            <Header title={'View Leads'} />
            <MembersList
                data={team}
                page={page}
                loading={loading}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                refresh={refresh}
            />
        </View>
    )
}

export default ViewLead;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
})