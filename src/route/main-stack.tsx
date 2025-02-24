import React from 'react';
import BottomTab from './BottomTab';
import { helpers } from '../utility';
import { MainStackProps } from './interface';
import DeviceInfo from 'react-native-device-info';
import RNBootSplash from "react-native-bootsplash";
import { getHashString } from '../utility/hashing';
import messaging from '@react-native-firebase/messaging';
import { useNetwork } from '../context/network-context';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigatorRef, } from '../hooks/navigation-ref';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore, useCommonStore, useProfileStore, useStartupStore } from '../store';
import { Activities, AddActivities, AddLead, AddNotes, AddProject, AddUpcomingActivities, ChangePassword, CreateReminder, EditLead, EditProfile, FileViewer, FilterMyLeads, FilterMyProjects, FollowUpToday, ForgotPassSuccess, ForgotPassword, LeadDetail, Login, Notes, ProjectDetails, Register, Reminders, ShareLead, ShareProject, UpdateProjectStatus, ViewLead, ViewTeam } from '../screen';

const Stack = createNativeStackNavigator<MainStackProps>();


const getInitialNotification = async () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
        if (remoteMessage) {
            const { data: { project_id, client_id } } = remoteMessage?.notification as any;
            if (project_id) {
                helpers.navigateThroughFCM("ProjectDetails", project_id);
            } else if (client_id) {
                helpers.navigateThroughFCM("LeadDetails", client_id);
            };
        };
    });
};

const MainStack = () => {
    const { isConnected } = useNetwork();
    const { fetchStartup } = useStartupStore();
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
        let fnName = 'getRequirementType';
        let hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
        const formData = { uuid, hash_key };
        getRequirementType({ token, formData });
    };

    const initialiseApp = React.useCallback(async () => {
        try {
            await getUuid();
            await getStates();
            if (token) {
                await Promise.all([
                    getRequirements(),
                    getProfileDetails(),
                    fetchStartup({ token })
                ]);
            }
            await getInitialNotification();
            await RNBootSplash.hide({ fade: true });
        } catch (error) {
            console.log('Error while initialising app : ', error);
        }
    }, [token, isConnected]);

    React.useEffect(() => {
        initialiseApp();
    }, [initialiseApp]);

    return (
        <NavigationContainer ref={MainStackNavigatorRef}>
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
                        <Stack.Screen name="Notes" component={Notes} />
                        <Stack.Screen name="AddLead" component={AddLead} />
                        <Stack.Screen name="EditLead" component={EditLead} />
                        <Stack.Screen name="AddNotes" component={AddNotes} />
                        <Stack.Screen name="ViewTeam" component={ViewTeam} />
                        <Stack.Screen name="ViewLeads" component={ViewLead} />
                        <Stack.Screen name="ShareLead" component={ShareLead} />
                        <Stack.Screen name="Reminders" component={Reminders} />
                        <Stack.Screen name="Activities" component={Activities} />
                        <Stack.Screen name="AddProject" component={AddProject} />
                        <Stack.Screen name="LeadDetails" component={LeadDetail} />
                        <Stack.Screen name="ShareProject" component={ShareProject} />
                        <Stack.Screen name="EditProfile" component={EditProfile} />
                        <Stack.Screen name="AddActivities" component={AddActivities} />
                        <Stack.Screen name="FilterMyLeads" component={FilterMyLeads} />
                        <Stack.Screen name="FollowUpToday" component={FollowUpToday} />
                        <Stack.Screen name="CreateReminder" component={CreateReminder} />
                        <Stack.Screen name="FileViewer" component={FileViewer} />
                        <Stack.Screen name="ChangePassword" component={ChangePassword} />
                        <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
                        <Stack.Screen name="FilterMyProjects" component={FilterMyProjects} />
                        <Stack.Screen name="UpdateProjectStatus" component={UpdateProjectStatus} />
                        <Stack.Screen name="AddUpcomingActivities" component={AddUpcomingActivities} />
                    </Stack.Group>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;