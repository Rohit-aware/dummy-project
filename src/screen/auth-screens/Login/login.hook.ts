import React from 'react';
import { RSA } from 'react-native-rsa-native';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import useAuthStore from "../../../store/auth/auth-store";
import { getHashString, RSAPUBLICKEY } from '../../../utility/hashing';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const useLogin = () => {
    const { deviceId: uuid, processDoLogin, loader, updateMyDeviceId } = useAuthStore();
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const [inputs, setInputs] = React.useState({
        email: 'vivek@vivek.com',
        password: '12345678',
    });

    const onForgot = () => navigate('ForgotPassword');
    const onRegister = () => navigate('Register');
    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });


    const doLogin = async () => {
        try {
            const passwordEncrypted = await RSA.encrypt('a1b47f54ba2ac437' + '12345678', RSAPUBLICKEY);
            const formData = new FormData();
            formData.append('email', inputs.email);
            formData.append('password', passwordEncrypted);
            formData.append('uuid', uuid);
            const response = await processDoLogin({ formData });
            if (response.status === '1') {
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
                    });
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