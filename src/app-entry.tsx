import React from 'react';
import MainStack from './router/main-stack';
import { StyleSheet, LogBox } from 'react-native';
import { useAuthStore, useStartupStore } from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNotificationPermission } from './hooks/notification-permission';

LogBox.ignoreAllLogs()

const AppEntry = () => {

    const { token } = useAuthStore();
    const { fetchStartup } = useStartupStore();
    const { requestPermission } = useNotificationPermission();

    React.useEffect(() => {
        requestPermission();
        fetchStartup({ token });
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