import React from 'react';
import { RSA } from 'react-native-rsa-native';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import useAuthStore from "../../../store/auth/auth-store";
import { MainStackProps } from '../../../router/interface';
import { getHashString, RSAPUBLICKEY } from '../../../utility/hashing';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showToast } from '../../../components';

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
    const { deviceId: uuid, processDoLogin, loader, updateMyDeviceId } = useAuthStore();
    const { navigate } = useNavigation<NativeStackNavigationProp<MainStackProps, 'Login'>>();

    const [inputs, setInputs] = React.useState({
        // email: 'testuser@email.com',
        // email: 'vivek@vivek.com',
        email: 'pankaj@kkuber.com',
        password: '123456789',
    });

    const onForgot = () => navigate('ForgotPassword');
    const onRegister = () => navigate('Register');
    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });


    const doLogin = async (): Promise<void> => {
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