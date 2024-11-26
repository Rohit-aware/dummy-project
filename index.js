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
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';

notifee.createChannel({
    name: 'Scheduled Notification',
    id: 'clms',
    badge: false,
    vibration: true,
    sound: 'default',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PRIVATE,
});


messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (!remoteMessage) return;
    helpers.onDisplayNotification(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);