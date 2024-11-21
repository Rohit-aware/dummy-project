import React from 'react';
import { Colors } from '../../../../constants';
import { StyleSheet, View } from 'react-native';
import { useActivitiesHook } from './activities-hook';
import ActivitiesList from './components/activities-list';
import { DateCalendar, Header } from '../../../../components';

const Activities = () => {
    const {
        refresh,
        showDate,
        onRefresh,
        onEndReached,
        onDateChange,
        upcActivities,
        upcActivityPage,
        upcActivityLoad,
    } = useActivitiesHook();

    return (
        <View style={styles.root}>
            <Header title={'Activities'} />
            <DateCalendar date={showDate} onDateChange={onDateChange} />
            <ActivitiesList
                data={upcActivities}
                page={upcActivityPage}
                refresh={refresh}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
                loading={upcActivityLoad}
            />
        </View>
    )
}

export default Activities;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
})