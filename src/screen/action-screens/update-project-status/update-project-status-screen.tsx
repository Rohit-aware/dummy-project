import React from 'react';
import Title from './components/title';
import { Colors } from '../../../constants';
import StatusModal from './components/status-modal';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useUpdateStatusHook } from './update-project-status-hook';
import UploadedFiles from '../../../components/file-inputes/uploaded-files';
import { Button, DateTimeInput, DropdownButton, Header, InputBox, UploadInput } from '../../../components';

const UpdateProjectStatus = () => {

    const {
        files,
        inputs,
        loading,
        onUpload,
        onUpdate,
        setFiles,
        isVisible,
        setVisible,
        onChangeText,
        onProjStatusChange,
    } = useUpdateStatusHook();

    return (
        <View style={styles.root}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}>
                <Header title={'Update Project Status'} />
                <Title />
                <DropdownButton
                    star
                    placeholder={'Project Status'}
                    name={'project_status'}
                    value={inputs.project_status}
                    onSelect={onChangeText}
                    onPress={() => setVisible(true)}
                    wrapperStyle={styles.wrapperbox}
                />
                {inputs.is_amount && (
                    <>
                        <InputBox
                            placeholder={'Amount in Lakhs'}
                            name={'amount'}
                            star
                            value={inputs.amount}
                            onChangeText={onChangeText}
                            keyboardType={'numeric'}
                        />
                        <DateTimeInput
                            placeholder="Date"
                            star
                            name="date"
                            value={inputs.date}
                            onChangeText={onChangeText}
                            mode="date"
                        />
                    </>
                )}

                {inputs.need_document && (
                    <>
                        <UploadInput placeholder="Upload Documents" onPress={onUpload} />
                        <UploadedFiles data={files} setFiles={setFiles} />
                    </>
                )}
                <InputBox
                    placeholder={'Remark'}
                    name={'remark'}
                    star
                    value={inputs.remark}
                    onChangeText={onChangeText}
                />
                <View style={styles.btncontainer}>
                    <Button
                        title={'Update'}
                        onPress={onUpdate}
                        loading={loading}
                    />
                </View>
            </ScrollView>
            <StatusModal
                isVisible={isVisible}
                setVisible={setVisible}
                onChangeText={onProjStatusChange}
                name={'project_status'}
            />
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
    btncontainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    wrapperbox: {
        marginTop: 30,
    },
});
export default UpdateProjectStatus;