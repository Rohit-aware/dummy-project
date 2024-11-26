import React from 'react';
import { helpers } from './utility';
import { Colors } from './constants';
import MainStack from './router/main-stack';
import messaging from '@react-native-firebase/messaging';
import { StyleSheet, LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNotificationPermission } from './hooks/notification-permission';
import { NetworkProvider } from './context/network-context';

LogBox.ignoreAllLogs()

const AppEntry = () => {

    const { requestPermission } = useNotificationPermission();

    React.useEffect(() => {
        requestPermission();
    }, []);

    React.useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            if (!remoteMessage) return;
            console.log('Message handled in the Forground! on AppEntry', remoteMessage);
            helpers.onDisplayNotification(remoteMessage);
        });
        return () => unsubscribe();
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar backgroundColor={Colors.lightblue} barStyle={'light-content'} networkActivityIndicatorVisible animated />
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