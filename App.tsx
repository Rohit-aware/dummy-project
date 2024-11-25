import React from 'react';
import AppEntry from './src/app-entry';
import { useNavigateHelper } from './src/hooks';
import notifee, { EventType } from '@notifee/react-native';

const App = () => {
    const { navigate } = useNavigateHelper();

    notifee.onForegroundEvent(async ({ type, detail }) => {
        switch (type) {
            case EventType.DELIVERED:
                break;
            case EventType.PRESS:
                const { project_id, client_id } = detail?.notification?.data as any;
                if (project_id) {
                    await navigate("ProjectDetails", project_id)
                }
                else if (client_id) {
                    await navigate("LeadDetails", client_id)
                }
                break;
            default:
                return true;
        }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
        switch (type) {
            case EventType.DELIVERED:
                break;
            case EventType.PRESS:
                const { project_id, client_id } = detail?.notification?.data as any;
                if (project_id) {
                    await navigate("ProjectDetails", project_id);
                } else if (client_id) {
                    await navigate("LeadDetails", client_id);
                }
                break;
            default:
                return;
        }
    });


    return (
        <AppEntry />
    );
};
export default App;