import React from "react";
import { Keyboard } from "react-native";
import { helpers } from "../../../utility";
import { useAuthStore } from "../../../store";
import { showToast } from "../../../components";
import { useNavigation } from "@react-navigation/native";




const useForgotPasswordHook = () => {
    const { navigate } = useNavigation<any>();
    const { checkForEmpty, emailCheck } = helpers;
    const [email, setEmail] = React.useState('');
    const { requestOtp, forgotLoad: loading } = useAuthStore();
    const onChangeText = (name:string,value: string) => setEmail(value);

    const onProceed = async () => {
        if (checkForEmpty(email)) {
            showToast('Please enter your email id');
        } else if (emailCheck(email)) {
            showToast('Please enter valid email id');
        } else {
            try {
                Keyboard.dismiss()
                const formData = new FormData();
                formData.append('workflow', 'fpw');
                formData.append('email', email);
                const response = await requestOtp({ formData });
                showToast(response.message, true);
                if (response.success == 1) {
                    navigate('ForgotPassSuccess', { message: response.message })
                }
            } catch (error) {
                console.log(error, 'error at onProceed');
            }
        }
    };

    return {
        onChangeText,
        email,
        onProceed,
        loading,
    };
};
export { useForgotPasswordHook };