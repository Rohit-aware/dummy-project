import React from 'react';
import MainStack from './router/main-stack';
import { StyleSheet, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
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
          console.log('Message handled in the Forground! on AppEntry', remoteMessage);
        });
        return () => unsubscribe();
      }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <MainStack />
        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default AppEntry;