/**
 * @format
 */
// Only import react-native-gesture-handler on native platforms
import App from './App';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";
import { helpers } from './src/utility';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    try {
        if (remoteMessage.data?.project_id) {
            helpers.navigateThroughFCM("ProjectDetails", remoteMessage.data.project_id);
        } else if (remoteMessage.data?.client_id) {
            helpers.navigateThroughFCM("LeadDetails", remoteMessage.data.client_id);
        }
    } catch (error) {
        console.error("Error handling background notification:", error);
    }
});

AppRegistry.registerComponent(appName, () => App);
