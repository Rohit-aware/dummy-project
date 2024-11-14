import React from "react";
import { helpers } from "../../utility";
import { showToast } from "../../components";
import { getHashString } from "../../utility/hashing";
import { useNavigation } from "@react-navigation/native";
import DocumentPicker from 'react-native-document-picker';
import { useAuthStore, useCommonStore, useMyLeadStore, useAddProjectSotre, useReloadStore } from "../../store";

interface ReturnType {
    files: any;
    loading: boolean;
    setFiles: React.Dispatch<any>;
    onUpload: () => Promise<void>;
    onSelect: (name: string, data: any) => void;
    onChangeText: (name: string, value: any) => void;
    onAddProject: () => Promise<any>;
    projectStatus: any[];
    requirementTypes: any[];
    inputs: {
        project_title: string;
        project_description: string;
        project_status: string;
        project_category_id: string;
        requirement_types: string;
        project_Status_id: string;
    };
}

const useAddProjectHook = (): ReturnType => {

    const navigation = useNavigation<any>();
    const { deviceId: uuid, user_detail: userData, token } = useAuthStore();
    const { projectStatus, requirementTypes } = useCommonStore();
    const { createProject } = useAddProjectSotre();
    const { leadDetails } = useMyLeadStore();
    const { reloadPage } = useReloadStore();
    const { client_id } = leadDetails;

    const { checkForEmpty } = helpers;

    const [files, setFiles] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(false);
    const [inputs, setInputs] = React.useState({
        project_title: '',
        project_description: '',
        project_status: '',
        project_category_id: '',
        requirement_types: '',
        project_Status_id: ''
    });
    const onChangeText = (name: string, value: any) => setInputs({ ...inputs, [name]: value });
    const onSelect = (name: string, data: any) => {
        name === 'requirement_types'
            ? setInputs({
                ...inputs,
                requirement_types: data['category_name'],
                project_category_id: data['project_category_id'],
            })
            :
            name === 'project_status'
                ?
                setInputs({
                    ...inputs,
                    project_status: data['project_status'],
                    project_Status_id: data['id'],
                })
                :
                setInputs({ ...inputs, [name]: data });
    };

    const onUpload = async () => {
        if (files.length == 5) {
            showToast('You cannot add more than 5 documents');
        } else {
            try {
                const response = await DocumentPicker.pick({
                    type: DocumentPicker.types.pdf,
                    allowMultiSelection: true
                });
                let fileArray: any[] = [];
                response.map((item, index) => {
                    index <= 4 &&
                        fileArray.push({ uri: item.uri, name: item.name, type: item.type });
                });
                if (fileArray.length + files.length > 5) {
                    showToast('You cannot add more than 5 documents');
                } else {
                    setFiles([...files, ...fileArray]);
                }
            } catch (error) {
                console.log(error, 'error at onUplaod funtion');
            }
        }
    };

    const onAddProject = async () => {
        if (checkForEmpty(inputs.project_title)) {
            showToast('Please enter project title');
        } else if (checkForEmpty(inputs.project_Status_id)) {
            showToast('Please select status');
        } else if (checkForEmpty(inputs.requirement_types)) {
            showToast('Please select requirement type');
        } else if (checkForEmpty(inputs.project_description)) {
            showToast('Please enter project description');
        } else {
            try {
                setLoading(true);
                const fnName = 'createProject';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                console.log({ client_id })
                formData.append('client_id', client_id);
                formData.append('project_category_id', inputs.project_category_id);
                formData.append('project_title', inputs.project_title);
                formData.append('project_description', inputs.project_description);
                formData.append('project_status', inputs.project_Status_id);
                files[0] && formData.append('uploaded_document1', files[0]);
                files[1] && formData.append('uploaded_document2', files[1]);
                files[2] && formData.append('uploaded_document3', files[2]);
                files[3] && formData.append('uploaded_document4', files[3]);
                files[4] && formData.append('uploaded_document5', files[4]);
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                const response = await createProject({ token, formData });
                showToast(response.message);
                if (response.success === '1') {
                    reloadPage();
                    // dispatch(FilterProjects(''));
                    // dispatch(enableProjectFilter({ project_status: null, client_id: null }));
                    navigation.navigate('BottomTab', { screen: 'MyProjects' });
                }
            } catch (error) {
                console.log(error, 'error at onAddProject');
            }
        }
        setLoading(false);
    };
    return {
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
    };
};

export { useAddProjectHook };