import React from "react";
import { helpers } from "../../../../utility";
import { showToast } from "../../../../components";
import { getHashString } from "../../../../utility/hashing";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useReloadStore, useNoteListingStore, useMyLeadStore, useAuthStore } from "../../../../store";



const useAddNotehook = () => {
    const { checkForEmpty } = helpers;
    const { reloadPage } = useReloadStore();
    const { dispatch } = useNavigation<any>();
    const { addNotes, addNoteLoad } = useNoteListingStore();
    const { leadDetails: { client_id } } = useMyLeadStore();
    const { token, user_detail: { mkey, msalt }, deviceId: uuid } = useAuthStore();
    const [inputs, setInputs] = React.useState({
        notes: '',
        call_status: '',
        call_status_key: '',
        followup_date: '', //moment().format('YYYY-MM-DD')
    });
    const [statusModal, setStatusModal] = React.useState(false);
    const onChangeText = (name: string, value: any) => setInputs({ ...inputs, [name]: value });
    const onSelect = (name: string, data: any) =>
        setInputs({ ...inputs, call_status: data.value, call_status_key: data.key });
    const closeStatusModal = () => setStatusModal(false);
    const openStatusModal = () => setStatusModal(true);

    const onAddNote = async () => {
        if (checkForEmpty(inputs.notes)) {
            showToast('Please enter note');
        } else if (checkForEmpty(inputs.call_status)) {
            showToast('Please select status');
        } else {
            try {
                const fnName = 'addNotes';
                const hash_key = getHashString(mkey!, msalt!, uuid, fnName);
                const formData = new FormData();
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                formData.append('client_id', client_id);
                formData.append('remark', inputs.notes);
                formData.append('visibility', 'public');
                formData.append('call_status', inputs.call_status_key);
                !checkForEmpty(inputs.followup_date) &&
                    formData.append('followup_date', inputs.followup_date);
                const response = await addNotes({ token, formData });
                showToast(response.message);
                if (response.success === '1') {
                    reloadPage();
                    dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'BottomTab', params: { name: 'MyLead' } },
                                { name: 'LeadDetails' },
                                { name: 'Notes' },
                            ],
                        })
                    );
                };
            } catch (error) {
                console.log(error, 'error at onAddNote');
                showToast('network error');
            }
        }
    };






    return {
        inputs,
        onSelect,
        onAddNote,
        statusModal,
        addNoteLoad,
        onChangeText,
        openStatusModal,
        closeStatusModal,
    };
};
export { useAddNotehook };