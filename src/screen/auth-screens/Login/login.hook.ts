import React from 'react';
import { helpers } from '../../../utility';
import { RSA } from 'react-native-rsa-native';
import { showToast } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import useAuthStore from "../../../store/auth/auth-store";
import { MainStackProps } from '../../../router/interface';
import { getHashString, RSAPUBLICKEY } from '../../../utility/hashing';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface LoginReturnType {
    loader: boolean;
    inputs: {
        email: string;
        password: string;
    };
    doLogin: () => Promise<void>;
    onForgot: () => void;
    onRegister: () => void;
    onChangeText: (name: string, value: string) => void;
};

const useLogin = (): LoginReturnType => {
    const { checkForEmpty, regexEmail } = helpers;
    const { deviceId: uuid, processDoLogin, loader, updateMyDeviceId } = useAuthStore();
    const { navigate } = useNavigation<NativeStackNavigationProp<MainStackProps, 'Login'>>();

    const [inputs, setInputs] = React.useState({
        email: __DEV__ ? 'pankaj@kkuber.com' : '',
        password: __DEV__ ? '123456789' : '',
    });

    const onForgot = () => navigate('ForgotPassword');
    const onRegister = () => navigate('Register');
    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });


    const doLogin = async (): Promise<void> => {
        if (checkForEmpty(inputs.email)) {
            showToast('Please enter email id');
        } else if (!regexEmail.test(inputs.email)) {
            showToast('Please enter valid email id');
        } else if (checkForEmpty(inputs.password)) {
            showToast('Please enter password');
        } else {
            try {
                const passwordEncrypted = await RSA.encrypt(uuid + inputs.password, RSAPUBLICKEY);
                const formData = new FormData();
                formData.append('email', inputs.email);
                formData.append('password', passwordEncrypted);
                formData.append('uuid', uuid);
                const response = await processDoLogin({ formData });
                showToast(response.message);
                if (response.success === '1') {
                    await messaging()
                        .getToken()
                        .then(token => {
                            console.log('FCM TOKEN  : ', { token });
                            const fnName = 'updateDeviceId';
                            const hash_key = getHashString(
                                response.data[0].mkey,
                                response.data[0].msalt,
                                uuid,
                                fnName,
                            );
                            const formdata = new FormData();
                            formdata.append('deviceId', token);
                            formdata.append('uuid', uuid);
                            formdata.append('hash_key', hash_key);
                            updateMyDeviceId({ token: response.payload.data[0].token, formData: formdata, })
                        }).catch((e) => { });
                }
            } catch (error: any) {
                console.log('Error inside doLogin function:', error);
            }
        }
    };



    return {
        loader,
        inputs,
        doLogin,
        onForgot,
        onRegister,
        onChangeText,
    }
}

export { useLogin };