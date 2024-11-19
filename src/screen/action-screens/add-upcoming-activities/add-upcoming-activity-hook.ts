import React from "react";
import moment from "moment";
import { helpers } from "../../../utility";
import { showToast } from "../../../components";
import { getHashString } from "../../../utility/hashing";
import { useNavigation } from "@react-navigation/native";
import { useActionStore, useAuthStore, useProjectDetailsStore, useReloadStore } from "../../../store";

type InputesType = {
    activity_type: "Online Meeting" | "Client Meeting" | '';
    address: string;
    url: string;
    agenda: string;
    activity_date: string;
    activity_time: string;
};


const useAddUpcomActivityHook = () => {
    const navigation = useNavigation<any>();
    const { websiteprefix, httpPrefix, checkForEmpty, scheduleNotification } = helpers;

    const { reloadPage } = useReloadStore();
    const { addUpcomingActivity, upcomActivityLoad: loading } = useActionStore();
    const { resetIsFinishPage, projectDetail: { project_id, client_id } } = useProjectDetailsStore();

    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const [check, setCheck] = React.useState(false);
    const [inputs, setInputs] = React.useState<InputesType>({
        activity_type: '',
        address: '',
        url: '',
        agenda: '',
        activity_date: '',//moment().add(1, 'day').format('YYYY-MM-DD')
        activity_time: '',//moment().format('HH:mm:ss')
    });
    const Activity_Type = ["Online Meeting", "Client Meeting"]
    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });
    const prefixCheck = () => {
        const result =
            inputs.url == websiteprefix ||
                inputs.url == '' ||
                !inputs.url.includes(httpPrefix)
                ? true
                : false;

        return result;
    };

    const addPrefix = ({ name }: { name: string }) => {
        if (name == 'url') {
            prefixCheck() && setInputs({ ...inputs, url: websiteprefix });
        }
    };

    const removePrefix = ({ name }: { name: string }) => {
        if (name == 'url') {
            prefixCheck() && setInputs({ ...inputs, url: '' });
        }
    };

    const checkUrl = () => {
        const result =
            inputs.activity_type == 'Online Meeting' && inputs.url == "" ? true : false;
        return result;
    };

    const checkAddress = () => {
        const result =
            inputs.activity_type == 'Client Meeting' && inputs.address == "" ? true : false;
        return result;
    };

    const onAdd = async () => {
        if (checkForEmpty(inputs.activity_type)) {
            showToast('Please select activity type');
        } else if (checkUrl()) {
            showToast('Please enter online meeting link');
        } else if (checkAddress()) {
            showToast('Please enter address');
        } else if (checkForEmpty(inputs.agenda)) {
            showToast('Please enter agenda');
        } else if (checkForEmpty(inputs.activity_date)) {
            showToast('Please select date');
        } else if (checkForEmpty(inputs.activity_time)) {
            showToast('Please select time');
        } else {
            try {
                const fnName = 'addUpcomingActivity';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                const is_set_reminder = check ? 'yes' : 'no';
                formData.append('client_id', client_id);
                formData.append('project_id', (project_id!.toString()));
                const type =
                    inputs.activity_type == 'Online Meeting' ? 'online' : 'f2f';
                formData.append('activity_type', type);
                inputs.activity_type == 'Client Meeting' &&
                    formData.append('address', inputs.address);
                inputs.activity_type == 'Online Meeting' &&
                    formData.append('url', inputs.url);
                formData.append('agenda', inputs.agenda);
                formData.append('activity_date', inputs.activity_date);
                formData.append('activity_time', inputs.activity_time);
                formData.append('is_set_reminder', is_set_reminder);
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                const response = await addUpcomingActivity({ token, formData });
                showToast(response.message);
                if (response.success == 1) {
                    if (is_set_reminder == 'yes') {
                        const now = moment(`${inputs.activity_date} ${inputs.activity_time}`).diff(
                            moment(new Date()),
                            'seconds',
                        );
                        await scheduleNotification({
                            now,
                            inputs: {
                                activity_type: inputs.activity_type,
                                agenda: inputs.agenda
                            }
                        })
                    }
                    reloadPage();
                    resetIsFinishPage();
                    navigation.navigate('ProjectDetails');
                }
            } catch (error) {
                console.log(error, 'error at onAdd');
            }
        };
    };
    return {
        check,
        onAdd,
        inputs,
        loading,
        setCheck,
        addPrefix,
        removePrefix,
        onChangeText,
        Activity_Type,
    };
};
export { useAddUpcomActivityHook };