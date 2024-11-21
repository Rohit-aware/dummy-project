import React from 'react';
import { Colors } from '../../../../constants';
import { StyleSheet, View } from 'react-native';
import RemindersList from './components/reminder-list';
import { DateCalendar, Header } from '../../../../components';
import { useRemindersHook } from './reminders-hook';

const Reminders = () => {

    const {
        page,
        loading,
        refresh,
        showDate,
        reminders,
        onRefresh,
        onDateChange,
        onEndReached,
    }=useRemindersHook()
    return (
        <View style={styles.container}>
            <Header title={'Reminders'} />
            <DateCalendar date={showDate} onDateChange={onDateChange} />
            <RemindersList
                data={reminders}
                loading={loading}
                onEndReached={onEndReached}
                refresh={refresh}
                onRefresh={onRefresh}
                page={page}
            />
        </View>
    )
}

export default Reminders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
})