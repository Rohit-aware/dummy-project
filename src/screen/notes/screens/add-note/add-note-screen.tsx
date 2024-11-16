import React from 'react';
import color from '../../../../constants/colors';
import { useAddNotehook } from './add-note-hook';
import NotesTitle from '../components/notes-title';
import StatusModal from '../components/status-modal';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, DateTimeInput, DropdownButton, Header, InputBox } from '../../../../components';

export default () => {
    const {
        inputs,
        onSelect,
        onAddNote,
        addNoteLoad,
        statusModal,
        onChangeText,
        openStatusModal,
        closeStatusModal,
    } = useAddNotehook();

    return (
        <View style={styles.root}>
            <Header title={'Add Notes'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.contentContainerStyle}>
                <NotesTitle />
                <InputBox
                    placeholder={'Add Note'}
                    star
                    onChangeText={onChangeText}
                    name={'notes'}
                    value={inputs.notes}
                    containerStyle={styles.notescontainer}
                    textinputStyle={styles.notesinput}
                    placeholderStyle={styles.placeholderStyle}
                    multiLine
                />
                <DropdownButton
                    onSelect={() => { }}
                    placeholder={'Select Status'}
                    value={inputs.call_status}
                    star
                    name={'call_status'}
                    onPress={openStatusModal}
                />
                <DateTimeInput
                    star={false}
                    placeholder="Follow Up Date"
                    name="followup_date"
                    value={inputs.followup_date}
                    onChangeText={onChangeText}
                    mode="date"
                />
                <View style={styles.btncontainer}>
                    <Button title={'Add Note'} onPress={onAddNote} loading={addNoteLoad} />
                </View>
            </ScrollView>
            <StatusModal
                show={statusModal}
                close={closeStatusModal}
                onSelect={onSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: color.white,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    notescontainer: {
        height: 150,
        marginTop: 30,
    },
    notesinput: {
        textAlignVertical: 'top',
        flex: 1,
        paddingVertical: 15,
    },
    placeholderStyle: { top: 15 },
    btncontainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
