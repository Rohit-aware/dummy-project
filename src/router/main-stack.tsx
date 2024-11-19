import React from 'react';
import BottomTab from './BottomTab';
import { MainStackProps } from './interface';
import DeviceInfo from 'react-native-device-info';
import { getHashString } from '../utility/hashing';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore, useCommonStore, useProfileStore } from '../store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddActivities, AddLead, AddNotes, AddProject, EditLead, ForgotPassSuccess, ForgotPassword, LeadDetail, Login, Notes, ProjectDetails, Register, ShareLead, ViewLead, ViewTeam } from '../screen';

const Stack = createNativeStackNavigator<MainStackProps>();

const MainStack = () => {

    const { getPersonalDetails } = useProfileStore();
    const { getStates, getRequirementType } = useCommonStore();
    const { updateDeviceId, token, user_detail: userData, deviceId: uuid } = useAuthStore();

    const getUuid = async () => {
        const deviceId = await DeviceInfo.getUniqueId();
        updateDeviceId({ id: deviceId });
    };
    const getProfileDetails = async () => {
        const fnName = 'getPersonalDetails';
        const hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
        const formData = { uuid, hash_key };
        getPersonalDetails({ token, formData });
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
        getProfileDetails();
    }, []);

    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!token ?
                    <Stack.Group>
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='Register' component={Register} />
                        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
                        <Stack.Screen name='ForgotPassSuccess' component={ForgotPassSuccess} />
                    </Stack.Group>
                    :
                    <Stack.Group>
                        <Stack.Screen name="BottomTab" component={BottomTab} />
                        <Stack.Screen name="AddLead" component={AddLead} />
                        <Stack.Screen name="LeadDetails" component={LeadDetail} />
                        <Stack.Screen name="AddProject" component={AddProject} />
                        <Stack.Screen name="EditLead" component={EditLead} />
                        <Stack.Screen name="Notes" component={Notes} />
                        <Stack.Screen name="AddNotes" component={AddNotes} />
                        <Stack.Screen name="ShareLead" component={ShareLead} />
                        <Stack.Screen name="ViewLeads" component={ViewLead} />
                        <Stack.Screen name="ViewTeam" component={ViewTeam} />
                        <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
                        <Stack.Screen name="AddActivities" component={AddActivities} />
                    </Stack.Group>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;