/**
 * @format
 */
// Only import react-native-gesture-handler on native platforms
import App from './App';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { helpers } from './src/utility';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';

notifee.createChannel({
    name: 'Scheduled Notification',
    id: 'clms',
    badge: false,
    vibration: true,
    sound: 'default',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PRIVATE,
});

notifee.onForegroundEvent(async ({ type, detail }) => {
    switch (type) {
        case EventType.DELIVERED:
            break;
        case EventType.PRESS:
            const { project_id, client_id } = detail?.notification?.data;
            if (project_id) {
                helpers.navigateThroughFCM("ProjectDetails", project_id)
            }
            else if (client_id) {
                helpers.navigateThroughFCM("LeadDetails", client_id)
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
            const { project_id, client_id } = detail?.notification?.data;
            if (project_id) {
                helpers.navigateThroughFCM("ProjectDetails", project_id);
            } else if (client_id) {
                helpers.navigateThroughFCM("LeadDetails", client_id);
            }
            break;
        default:
            return;
    }
});


messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (!remoteMessage) return;
    helpers.onDisplayNotification(remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        return null;
    };
    return <App />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);