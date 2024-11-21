import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../../../constants';
import FollowupList from './components/followup-list';
import { DateCalendar, Header } from '../../../../components';
import { useTodaysFollowUpsHook } from './followups-hook';

const FollowUpToday = () => {

    const {
        showDate,
        onDateChange,
        followup,
        refresh,
        onEndReached,
        onRefresh,
        loading,
        page,
    } = useTodaysFollowUpsHook();
    return (
        <View style={styles.container}>
            <Header title="Follow-Ups" />
            <DateCalendar date={showDate} onDateChange={onDateChange} />
            <FollowupList
                data={followup}
                refresh={refresh}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
                loading={loading}
                page={page}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
});

export default FollowUpToday;