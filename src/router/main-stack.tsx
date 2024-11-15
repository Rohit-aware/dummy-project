import React from 'react';
import BottomTab from './BottomTab';
import { MainStackProps } from './interface';
import DeviceInfo from 'react-native-device-info';
import { AddLead, AddProject, EditLead, LeadDetail, Login, Register } from '../screen';
import { useAuthStore, useCommonStore } from '../store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHashString } from '../utility/hashing';

const Stack = createNativeStackNavigator<MainStackProps>();

const MainStack = () => {

    const { getStates, getRequirementType } = useCommonStore();
    const { updateDeviceId, token, user_detail: userData, deviceId: uuid } = useAuthStore();

    const getUuid = async () => {
        const deviceId = await DeviceInfo.getUniqueId();
        updateDeviceId({ id: deviceId });
    };
    const getRequirements = () => {
        if (token) {
            let fnName = 'getRequirementType';
            let hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
            const formData = { uuid, hash_key };
            getRequirementType({ token, formData });
        }
    };

    React.useEffect(() => {
        getUuid();
        getStates();
        getRequirements();
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
                        <Stack.Screen name="AddProject" component={AddProject} />
                        <Stack.Screen name="EditLead" component={EditLead} />
                    </Stack.Group>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;