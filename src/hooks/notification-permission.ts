import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { AppState, Platform, PermissionsAndroid } from 'react-native';

export type NotifiPermiStatus = 'granted' | 'denied' | 'not-determined';

export type NotifiPermReqResult = 'granted' | 'denied' | 'not-determined';

interface NotifiPermiState {
    hasPermission: boolean;
    requestPermission: () => Promise<boolean>;
}

function usePermission(get: () => Promise<NotifiPermiStatus>, request: () => Promise<NotifiPermReqResult>): NotifiPermiState {
    const [hasPermission, setHasPermission] = React.useState<boolean>(false);

    const requestPermission = React.useCallback(async () => {
        const result = await request();
        const hasPermissionNow = result === 'granted';
        setHasPermission(hasPermissionNow);
        return hasPermissionNow;
    }, [request]);

    React.useEffect(() => {
        // Refresh permission when app state changes
        const listener = AppState.addEventListener('change', async () => {
            const status = await get();
            setHasPermission(status === 'granted');
        });
        return () => listener.remove();
    }, [get]);

    return React.useMemo(
        () => ({
            hasPermission,
            requestPermission,
        }),
        [hasPermission, requestPermission]
    );
}

async function getNotifiPermiStatus(): Promise<NotifiPermiStatus> {
    try {
        const authStatus = await messaging().hasPermission();
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            return 'granted';
        } else {
            return 'denied';
        }
    } catch (error) {
        console.log('Error checking notification permission status:', error);
        return 'not-determined';
    }
}

async function requestNotificationPermission(): Promise<NotifiPermReqResult> {
    try {
        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                return granted === PermissionsAndroid.RESULTS.GRANTED ? 'granted' : 'denied';
            } else {
                const authStatus = await messaging().requestPermission();
                const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                return enabled ? 'granted' : 'denied';
            }
        } else {
            const authStatus = await messaging().requestPermission();
            const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            return enabled ? 'granted' : 'denied';
        }
    } catch (error) {
        console.log('Error requesting notification permission:', error);
        return 'denied';
    }
}

export function useNotificationPermission(): NotifiPermiState {
    return usePermission(getNotifiPermiStatus, requestNotificationPermission);
}
