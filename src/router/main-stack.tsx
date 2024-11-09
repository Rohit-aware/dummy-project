import React from 'react';
import BottomTab from './BottomTab';
import { Login, Register } from '../screen';
import useAuthStore from '../store/auth/auth-store';
import DeviceInfo from 'react-native-device-info';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const { updateDeviceId, token } = useAuthStore();
    const getUuid = async () => {
        const deviceId = await DeviceInfo.getUniqueId();
        updateDeviceId(deviceId);
    };

    React.useEffect(() => {
        getUuid();
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

export default MainStack