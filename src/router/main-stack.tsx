import React from 'react';
import BottomTab from './BottomTab';
import { Login, Register } from '../screen';
import { MainStackProps } from './interface';
import DeviceInfo from 'react-native-device-info';
import { getItem } from '../local-storage/key-store';
import { useAuthStore, useCommonStore } from '../store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainStackProps>();

const MainStack = () => {
    const [user_token, setToken] = React.useState('');
    const fetchToken = async () => {
        const storedToken = await getItem();
        setToken(storedToken!);
    };

    const { updateDeviceId, token } = useAuthStore();
    const { getStates } = useCommonStore();

    const getUuid = async () => {
        const deviceId = await DeviceInfo.getUniqueId();
        updateDeviceId({ id: deviceId });
    };

    React.useEffect(() => {
        getUuid();
        getStates();
        fetchToken();
    }, []);

    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user_token ?
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