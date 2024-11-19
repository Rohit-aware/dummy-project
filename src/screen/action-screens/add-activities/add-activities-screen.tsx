import React from 'react';
import Title from './components/title';
import { Colors } from '../../../constants';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Header, InputBox, UploadFiles, UploadInput } from '../../../components';
import { useAddActivityHook } from './add-activities-hook';

const AddActivities = () => {
    const {
        files,
        inputs,
        loading,
        onUpload,
        setFiles,
        onChangeText,
        onAddActivity,
    } = useAddActivityHook();
    
    return (
        <View style={styles.root}>
            <Header title={'Add Activities'} />
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <Title />
                <InputBox
                    name={'activity_title'}
                    star
                    value={inputs.activity_title}
                    onChangeText={onChangeText}
                    placeholder={'Activity Title'}
                    containerStyle={styles.titleinput}
                />

                <InputBox
                    placeholder={'Project Brief Requirement'}
                    star
                    onChangeText={onChangeText}
                    name={'remark'}
                    value={inputs.remark}
                    containerStyle={styles.linkContainer}
                    textinputStyle={styles.linkInput}
                    placeholderStyle={styles.placeholderStyle}
                    multiLine={true}
                />
                <UploadInput placeholder="Upload Documents" onPress={onUpload} />
                <UploadFiles data={files} setFiles={setFiles} />
                <View style={styles.btncontainer}>
                    <Button
                        title={'ADD'}
                        onPress={onAddActivity}
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
    titleinput: {
        marginTop: 30,
    },
    linkContainer: {
        height: 150,
    },
    linkInput: {
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

export default AddActivities;