import React from "react";
import { helpers } from "../../../utility";
import { showToast } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { getHashString } from "../../../utility/hashing";
import DocumentPicker from 'react-native-document-picker';
import { useActionStore, useAuthStore, useCommonStore, useProjectDetailsStore, useReloadStore } from "../../../store";



const useUpdateStatusHook = () => {

    const { navigate } = useNavigation<any>();
    const { checkForEmpty } = helpers;
    const { reloadPage } = useReloadStore();
    const { projectStatus } = useCommonStore();
    const { updateProjectStatus } = useActionStore();
    const { projectDetail: { project_id } } = useProjectDetailsStore();

    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const [isVisible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [files, setFiles] = React.useState<Array<any>>([]);
    const [inputs, setInputs] = React.useState({
        project_status: '',
        project_status_id: '',
        amount: '',
        date: '',
        remark: '',
        is_amount: false,
        need_document: false,
    });

    const getAmtDocValue = (value: { [key: string]: string }) => {
        const Value = projectStatus.find(e => e.id === value.id);
        if (Value) {
            setInputs((prev) => ({
                ...prev,
                is_amount: Value.is_amount === "1",
                need_document: Value.need_document === "1",
            }));
        }
    };
    const onUpload = async () => {
        try {
            const response = await DocumentPicker.pick({
                type: DocumentPicker.types.pdf,
                allowMultiSelection: false,
            });
            const file = { uri: response[0]?.uri, name: response[0]?.name, type: response[0]?.type };
            setFiles([file]);
        } catch (error) {
            console.log(error, 'error at onUpload function');
        }
    };

    const onChangeText = (name: string, value: any) => setInputs({ ...inputs, [name]: value });

    const onProjStatusChange = (name: string, value: { [key: string]: string }) => {
        setInputs({
            ...inputs,
            [name]: value.project_status,
            project_status_id: value.id,
        });
        getAmtDocValue(value)
    }
    // const checkForConverted = (value: string) => {
    //     const result =
    //         inputs.project_status == 'Converted' && value == '' ? true : false;
    //     return result;
    // };

    const compareDates = () => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const date = new Date().getDate();
        const currentTime = new Date(`${year}-${month + 1}-${date}`).getTime();
        const selectedTime = new Date(inputs.date).getTime();

        if (selectedTime >= currentTime) {
            return false;
        } else {
            return true;
        }
    };

    const onUpdate = async () => {
        if (checkForEmpty(inputs.project_status)) {
            showToast('Please select project status');
        } else if (inputs.is_amount && checkForEmpty(inputs.amount)) {
            showToast('Please enter amount');
        } else if (inputs.is_amount && checkForEmpty(inputs.date)) {
            showToast('Please enter date');
        } else if (inputs.is_amount && compareDates()) {
            showToast('Please enter future date');
        } else if (checkForEmpty(inputs.remark)) {
            showToast('Please enter remark');
        } else {
            try {
                setLoading(true)
                const fnName = 'updateProjectStatus';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                formData.append('project_id', project_id);
                formData.append('project_status', inputs.project_status_id);
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                formData.append('remark', inputs.remark);
                if (inputs.is_amount) {
                    formData.append('amount', inputs.amount);
                    formData.append('conversion_date', inputs.date);
                }
                if (inputs.need_document && files.length > 0) {
                    formData.append('upload_document', files[0]);
                }
                const response = await updateProjectStatus({ token, formData });
                showToast(response.message)
                if (response.success === '1') {
                    reloadPage();
                    navigate("BottomTab", { screen: 'MyProjects' });
                }
            } catch (error) {
                console.log(error, "error at onUpdate")
            }
        }
        setLoading(false)
    };



    return {
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
    };
};
export { useUpdateStatusHook };