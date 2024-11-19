import React from "react";
import { helpers } from "../../../utility";
import { showToast } from "../../../components";
import { getHashString } from "../../../utility/hashing";
import { useNavigation } from "@react-navigation/native";
import DocumentPicker from 'react-native-document-picker';
import { useActionStore, useAuthStore, useProjectDetailsStore, useReloadStore } from "../../../store";

const useAddActivityHook = () => {

    const { checkForEmpty } = helpers;
    const navigation = useNavigation<any>();

    const { reloadPage } = useReloadStore();
    const { addActivity, activityLoad: loading } = useActionStore();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { resetIsFinishPage, projectDetail: { project_id } } = useProjectDetailsStore();

    const [files, setFiles] = React.useState<Array<any>>([]);
    const [inputs, setInputs] = React.useState({
        activity_title: '',
        remark: '',
    });

    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });

    const onUpload = async () => {
        if (files.length == 5) {
            showToast('You cannot add more than 5 document files');
        } else {
            try {
                const response = await DocumentPicker.pick({
                    type: [DocumentPicker.types.pdf],
                    allowMultiSelection: true
                });
                let fileArray: Array<any> = [];
                response.map((item, index) => {
                    index <= 4 &&
                        fileArray.push({ uri: item.uri, name: item.name, type: item.type });
                });
                if (fileArray.length + files.length > 5) {
                    showToast('You cannot add more than 5 document files');
                } else {
                    setFiles([...files, ...fileArray]);
                }
            } catch (error) { }
        }
    };

    const onAddActivity = async () => {
        if (checkForEmpty(inputs.activity_title)) {
            showToast('Please enter activity title');
        } else if (checkForEmpty(inputs.remark)) {
            showToast('Please enter project brief requirement');
        } else {
            try {
                const fnName = 'addActivity';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                formData.append('project_id', project_id);
                formData.append('activity_title', inputs.activity_title);
                formData.append('remark', inputs.remark);
                files[0] && formData.append('uploaded_document1', files[0]);
                files[1] && formData.append('uploaded_document2', files[1]);
                files[2] && formData.append('uploaded_document3', files[2]);
                files[3] && formData.append('uploaded_document4', files[3]);
                files[4] && formData.append('uploaded_document5', files[4]);
                formData.append('is_project', 'yes');
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);

                const response = await addActivity({ token, formData });
                showToast(response.message);
                if (response.success === '1') {
                    reloadPage();
                    resetIsFinishPage();
                    navigation.navigate('ProjectDetails');
                }
            } catch (error) {
                console.log('Error at onAddActivity  : ', error);
            }
        }
    };


    return {
        files,
        inputs,
        loading,
        onUpload,
        setFiles,
        onChangeText,
        onAddActivity,
    };
};
export { useAddActivityHook };