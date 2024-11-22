import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store";
import React from "react";
import { showToast } from "../../components";
import { Keyboard } from "react-native";
import { getHashString, RSAPUBLICKEY } from "../../utility/hashing";
import { RSA } from "react-native-rsa-native";
import { helpers } from "../../utility";
import { networkRequest } from "../../services/network-request";
import { endpoints } from "../../services/endpoints";

const useChangePasswordHook = () => {
    const { checkForEmpty } = helpers;
    const navigation = useNavigation<any>();
    const { user_detail: userData, token, deviceId: uuid } = useAuthStore();
    const [loading, setLoading] = React.useState(false);
    const [inputs, setInputs] = React.useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });
    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });
    const passwordMatchCheck = () =>
        inputs.new_password == inputs.confirm_password ? false : true;

    const onUpdate = async () => {
        if (checkForEmpty(inputs.old_password)) {
            showToast('Please enter your old password');
        } else if (checkForEmpty(inputs.new_password)) {
            showToast('Please enter new password');
        } else if (checkForEmpty(inputs.confirm_password)) {
            showToast('Please enter confirm password');
        } else if (passwordMatchCheck()) {
            showToast('New password and confirm password should match');
        } else {
            Keyboard.dismiss();
            setLoading(true);
            try {
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    'updatePassword',
                );
                const passwordEncrpted = await RSA.encrypt(
                    uuid + inputs.old_password,
                    RSAPUBLICKEY,
                );
                const formData = new FormData();
                formData.append('old_password', passwordEncrpted);
                formData.append('new_password', inputs.new_password);
                formData.append('confirm_password', inputs.confirm_password);
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                const response = await networkRequest({ token }).post(endpoints.updatePassword, formData);
                setLoading(false)
                showToast(response.data.message);
                if (response.data.success == 1) {
                    navigation.goBack();
                }
            } catch (error) {
                setLoading(false)
            }
        }
    };
    return {
        inputs,
        loading,
        onUpdate,
        onChangeText,
    };
};
export { useChangePasswordHook };