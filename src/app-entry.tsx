import React from 'react';
import { helpers } from './utility';
import { Colors } from './constants';
import MainStack from './route/main-stack';
import messaging from '@react-native-firebase/messaging';
import { NetworkProvider } from './context/network-context';
import { StyleSheet, LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNotificationPermission } from './hooks/notification-permission';

LogBox.ignoreAllLogs()

const AppEntry = () => {

    const { requestPermission } = useNotificationPermission();

    React.useEffect(() => {
        requestPermission();
    }, []);

    React.useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            if (!remoteMessage) return;
            if (remoteMessage) {
                const { data: { project_id, client_id } } = remoteMessage?.notification as any;
                if (project_id) {
                    helpers.navigateThroughFCM("ProjectDetails", project_id);
                } else if (client_id) {
                    helpers.navigateThroughFCM("LeadDetails", client_id);
                };
            };
            helpers.onDisplayNotification(remoteMessage);
        });
        return () => unsubscribe();
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar backgroundColor={Colors.lightblue} barStyle={'light-content'} />
            <NetworkProvider>
                <MainStack />
            </NetworkProvider>
        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default AppEntry;