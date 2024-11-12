import React from 'react';
import BottomTab from './BottomTab';
import { Login, Register } from '../screen';
import { MainStackProps } from './interface';
import { NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useAuthStore, useCommonStore } from '../store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainStackProps>();

const { KeystoreModule } = NativeModules;

const MainStack = () => {

    const { updateDeviceId, token: authToken } = useAuthStore();
    const { getStates } = useCommonStore();
    const [token, setToken] = React.useState('');
    const getUuid = async () => {
        const deviceId = await DeviceInfo.getUniqueId();
        updateDeviceId({ id: deviceId });
    };

    const getStoredToken = () => {
        KeystoreModule.getToken(
            (token: string) => {
                console.log('retried token in main stack : ', token)
                setToken(token); // Update the token in the store
            },
            (error: any) => {
                console.error('Error retrieving token:', error);
            }
        );
    };

    React.useEffect(() => {
        getUuid();
        getStates();
        getStoredToken();
    }, []);

    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!token ?
                    <Stack.Group>
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='Register' component={Register} />
                    </Stack.Group>
                    :
                    <Stack.Group>
                        <Stack.Screen name="BottomTab" component={BottomTab} />
                    </Stack.Group>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;