import React from "react";
import { MainStackNavigatorRef } from "./mainstack-navigation-ref";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

const navigateThroughFCM = (name?: string | any, params?: object | undefined | any) => {
    MainStackNavigatorRef.current?.navigate(name, params);
}
const notificationHandler = () => {
    React.useEffect(() => {
        // Handling notification when the app is launched from a terminated state
        messaging().getInitialNotification().then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
            try {
                if (remoteMessage?.data?.project_id) {
                    navigateThroughFCM("ProjectDetails", remoteMessage.data.project_id);
                } else if (remoteMessage?.data?.client_id) {
                    navigateThroughFCM("LeadDetails", remoteMessage.data.client_id);
                }
            } catch (error) {
                console.error("Error handling initial notification:", error);
            }
        });

        // Handling background notifications
        messaging().setBackgroundMessageHandler(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            try {
                if (remoteMessage.data?.project_id) {
                    navigateThroughFCM("ProjectDetails", remoteMessage.data.project_id);
                } else if (remoteMessage.data?.client_id) {
                    navigateThroughFCM("LeadDetails", remoteMessage.data.client_id);
                }
            } catch (error) {
                console.error("Error handling background notification:", error);
            }
        });

        // Handling notifications when the app is in the foreground
        messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            try {
                if (remoteMessage.data?.project_id) {
                    navigateThroughFCM("ProjectDetails", remoteMessage.data.project_id);
                } else if (remoteMessage.data?.client_id) {
                    navigateThroughFCM("LeadDetails", remoteMessage.data.client_id);
                }
            } catch (error) {
                console.error("Error handling notification opened app:", error);
            }
        });
    }, []);
};
export { notificationHandler };