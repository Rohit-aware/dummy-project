import React from 'react';
import { Header } from '../../components';
import { Colors } from '../../constants';
import { useViewTeamHook } from './view-team-hook';
import MembersList from './components/members-list';
import { StyleSheet, Text, View } from 'react-native';

const ViewTeam = () => {

    const {
        page,
        teams,
        loading,
        refresh,
        isFinish,
        onRefresh,
        onEndReached,
    } = useViewTeamHook();
    return (
        <View style={styles.root}>
            <Header title={'View Team'} />
            <MembersList
                data={teams}
                finish={isFinish}
                page={page}
                loading={loading}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                refresh={refresh}
            />
        </View>
    )
}

export default ViewTeam

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
})