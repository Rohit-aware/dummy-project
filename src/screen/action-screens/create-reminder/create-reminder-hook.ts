import React from "react";
import moment from "moment";
import { helpers } from "../../../utility";
import { showToast } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { getHashString } from "../../../utility/hashing";
import { useActionStore, useAuthStore, useProjectDetailsStore } from "../../../store";


const useCreateReminderHook = () => {
    const { goBack } = useNavigation();
    const { checkForEmpty, scheduleNotification } = helpers;
    const { projectDetail: { project_id } } = useProjectDetailsStore();

    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { createReminder } = useActionStore();
    const [loading, setLoading] = React.useState(false);
    const [inputs, setInputs] = React.useState({
        title: '',
        description: '',
        reminder_date: '',//moment().add(1, 'day').format('YYYY-MM-DD')
        reminder_time: '',//moment().format('HH:mm:ss')
    });
    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });

    const onCreate = async () => {
        if (checkForEmpty(inputs.title)) {
            showToast('Please enter title');
        } else if (checkForEmpty(inputs.description)) {
            showToast('Please enter message');
        } else if (checkForEmpty(inputs.reminder_date)) {
            showToast('Please select date');
        } else if (checkForEmpty(inputs.reminder_time)) {
            showToast('Please select time');
        } else {
            try {
                setLoading(true);
                const fnName = 'createReminder';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                formData.append('project_id', project_id);
                formData.append('title', inputs.title);
                formData.append('description', inputs.description);
                formData.append('reminder_date', inputs.reminder_date);
                formData.append('reminder_time', inputs.reminder_time);
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                const response = await createReminder({ token, formData })
                setLoading(false);
                showToast(response.message);
                if (response.success === '1') {
                    const scheduleTime = moment(
                        `${inputs.reminder_date} ${inputs.reminder_time}`,
                    ).diff(moment(new Date()), 'seconds');
                    await scheduleNotification({
                        scheduleTime,
                        inputs: {
                            title: inputs.title,
                            body: inputs.description,
                            project_id: project_id,
                            client_id: ''
                        }
                    });
                    goBack();
                };
            } catch (e) {
                console.log(e, "error at onCreate")
            }
        }
    };


    return {
        inputs,
        loading,
        onCreate,
        onChangeText,
    };
};
export { useCreateReminderHook };