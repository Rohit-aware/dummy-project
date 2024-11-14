import React from 'react';
import { styles } from './styles';
import Title from './components/title';
import { ScrollView, View } from 'react-native';
import { useAddProjectHook } from './add-project.hook';
import { Button, DropdownButton, Header, InputBox, UploadInput } from '../../components';
import UploadedFiles from '../../components/file-inputes/uploaded-files';

const AddProject = () => {

    const {
        files,
        inputs,
        loading,
        setFiles,
        onUpload,
        onSelect,
        onChangeText,
        onAddProject,
        projectStatus,
        requirementTypes,
    } = useAddProjectHook();
    return (
        <View style={styles.root}>
            <Header title={'Add Project'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}>
                <Title />
                <InputBox
                    name={'project_title'}
                    star
                    value={inputs.project_title}
                    onChangeText={onChangeText}
                    placeholder={'Project Title'}
                    containerStyle={styles.titleinput}
                />
                <DropdownButton
                    name={'project_status'}
                    placeholder={'Status'}
                    data={projectStatus}
                    onSelect={onSelect}
                    value={inputs.project_status}
                    star
                />
                <DropdownButton
                    name={'requirement_types'}
                    placeholder={'Requirement Type'}
                    data={requirementTypes}
                    onSelect={onSelect}
                    value={inputs.requirement_types}
                    star
                />
                <InputBox
                    placeholder={'Project Brief Requirement'}
                    star
                    onChangeText={onChangeText}
                    name={'project_description'}
                    value={inputs.project_description}
                    containerStyle={styles.linkContainer}
                    textinputStyle={styles.linkInput}
                    placeholderStyle={styles.placeholderStyle}
                    multiLine={true}
                />
                <UploadInput placeholder="Upload Documents" onPress={onUpload} />
                <UploadedFiles data={files} setFiles={setFiles} />
                <View style={styles.btncontainer}>
                    <Button title={'ADD PROJECT'} onPress={onAddProject} loading={loading} />
                </View>
            </ScrollView>
        </View>
    )
}

export default AddProject;