import React from 'react';
import Title from './components/title';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import CheckBox from 'react-native-check-box';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, DateTimeInput, DropdownButton, Header, InputBox } from '../../../components';
import { useAddUpcomActivityHook } from './add-upcoming-activity-hook';

const AddUpcomingActivities = () => {
    const {
        check,
        onAdd,
        inputs,
        loading,
        setCheck,
        addPrefix,
        removePrefix,
        onChangeText,
        Activity_Type,
    } = useAddUpcomActivityHook();
    return (
        <View style={styles.root}>
            <Header title={'Add Upcoming Activities'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}>
                <Title />
                <DropdownButton
                    data={Activity_Type}
                    placeholder={'Activity Type'}
                    star
                    name={'activity_type'}
                    value={inputs.activity_type}
                    onSelect={onChangeText}
                    wrapperStyle={styles.typecontainer}
                />

                {inputs.activity_type == 'Online Meeting' && (
                    <InputBox
                        placeholder={'Online Meeting Link'}
                        onChangeText={onChangeText}
                        name={'url'}
                        star
                        value={inputs.url}
                        onFocus={() => addPrefix({ name: 'url' })}
                        onBlur={() => removePrefix({ name: 'url' })}
                        containerStyle={styles.linkContainer}
                        textinputStyle={styles.linkInput}
                        placeholderStyle={styles.placeholderStyle}
                        multiLine={true}
                    />
                )}
                {inputs.activity_type == 'Client Meeting' && (
                    <InputBox
                        name={'address'}
                        star
                        value={inputs.address}
                        onChangeText={onChangeText}
                        placeholder={'Address'}
                        containerStyle={styles.linkContainer}
                        textinputStyle={styles.linkInput}
                        placeholderStyle={styles.placeholderStyle}
                        multiLine={true}
                    />
                )}
                <InputBox
                    name={'agenda'}
                    star
                    value={inputs.agenda}
                    onChangeText={onChangeText}
                    placeholder={'Agenda'}
                />
                <View style={styles.wrapper}>
                    <DateTimeInput
                        placeholder="Date"
                        star
                        containerStyle={styles.datecontainer}
                        name="activity_date"
                        value={inputs.activity_date}
                        onChangeText={onChangeText}
                        mode="date"
                    />
                    <DateTimeInput
                        placeholder="Time"
                        star
                        containerStyle={styles.timecontainer}
                        name="activity_time"
                        value={inputs.activity_time}
                        onChangeText={onChangeText}
                        mode="time"
                    />
                </View>
                <CheckBox
                    isChecked={check}
                    checkedCheckBoxColor={Colors.lightblue}
                    rightText="Set Reminder"
                    rightTextStyle={{ ...fontStyles.r3 }}
                    onClick={() => setCheck(!check)}
                    uncheckedCheckBoxColor={Colors.lightblue}
                    style={styles.checkBox}
                />
                <View style={styles.btncontainer}>
                    <Button
                        title={'ADD'}
                        onPress={onAdd}
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
    typecontainer: {
        marginTop: 30,
    },
    linkContainer: {
        height: 100,
    },
    linkInput: {
        textAlignVertical: 'top',
        flex: 1,
        paddingVertical: 15,
    },
    placeholderStyle: { top: 15 },
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
    checkBox: {
        marginHorizontal: 17,
        marginTop: 10,
    },
    btncontainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});

export default AddUpcomingActivities;