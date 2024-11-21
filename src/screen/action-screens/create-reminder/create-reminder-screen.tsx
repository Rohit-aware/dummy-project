import React from 'react';
import { Colors } from '../../../constants';
import ReminderTitle from './components/reminder-title';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useCreateReminderHook } from './create-reminder-hook';
import { Button, DateTimeInput, Header, InputBox } from '../../../components';


const CreateReminder = () => {

    const {
        inputs,
        loading,
        onCreate,
        onChangeText,
    } = useCreateReminderHook();

    return (
        <View style={styles.root}>
            <Header title={'Create Reminder'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}>
                <ReminderTitle />
                <InputBox
                    name={'title'}
                    star
                    value={inputs.title}
                    onChangeText={onChangeText}
                    placeholder={'Title'}
                />
                <InputBox
                    placeholder={'Message'}
                    star
                    onChangeText={onChangeText}
                    name={'description'}
                    value={inputs.description}
                    containerStyle={styles.messagecontainer}
                    textinputStyle={styles.messageinput}
                    placeholderStyle={styles.placeholderStyle}
                    multiLine={true}
                />
                <View style={styles.wrapper}>
                    <DateTimeInput
                        placeholder="Date"
                        star
                        containerStyle={styles.datecontainer}
                        name="reminder_date"
                        value={inputs.reminder_date}
                        onChangeText={onChangeText}
                        mode="date"
                    />
                    <DateTimeInput
                        placeholder="Time"
                        star
                        containerStyle={styles.timecontainer}
                        name="reminder_time"
                        value={inputs.reminder_time}
                        onChangeText={onChangeText}
                        mode="time"
                    />
                </View>
                <View style={styles.btncontainer}>
                    <Button
                        title={'CREATE'}
                        onPress={onCreate}
                        loading={loading}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    messagecontainer: {
        height: 100,
    },
    messageinput: {
        textAlignVertical: 'top',
        flex: 1,
        paddingVertical: 15,
    },
    placeholderStyle: {
        top: 15,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    datecontainer: {
        marginHorizontal: 0,
        flex: 1,
        marginRight: 15,
    },
    timecontainer: {
        marginHorizontal: 0,
        flex: 1,
    },
    btncontainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
export default CreateReminder;