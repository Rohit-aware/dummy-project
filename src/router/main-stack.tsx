import React from 'react';
import BottomTab from './BottomTab';
import { MainStackProps } from './interface';
import DeviceInfo from 'react-native-device-info';
import { AddLead, LeadDetail, Login, Register } from '../screen';
import { useAuthStore, useCommonStore } from '../store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainStackProps>();

const MainStack = () => {

    const { getStates } = useCommonStore();
    const { updateDeviceId, token } = useAuthStore();

    const getUuid = async () => {
        const deviceId = await DeviceInfo.getUniqueId();
        updateDeviceId({ id: deviceId });
    };

    React.useEffect(() => {
        getUuid();
        getStates();
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
                        <Stack.Screen name="AddLead" component={AddLead} />
                        <Stack.Screen name="LeadDetails" component={LeadDetail} />
                    </Stack.Group>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;