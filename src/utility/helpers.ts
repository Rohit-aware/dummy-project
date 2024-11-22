import { Linking, Platform } from 'react-native';
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';
import { MainStackNavigatorRef } from '../hooks/mainstack-navigation-ref';

interface NotificationInputs {
    title: string;
    body: string;
    project_id?: string | number
    client_id?: string | number
}
interface Helpers {
    phoneno: RegExp;
    aadharno: RegExp;
    Genders: Array<{
        short_name: string;
        full_name: string;
    }>
    regexEmail: RegExp;
    httpPrefix: string;
    websiteprefix: string;
    linkedInprefix: string;
    isEmpty: (value: string) => string;
    emailCheck: (value: string) => boolean;
    getDateString: (value: string) => string;
    checkForEmpty: (value: string) => boolean;
    openCall: ({ phone }: { phone: string }) => void;
    createNotificationChannel: () => Promise<string | ''>;
    navigateThroughFCM: (name?: string | any, params?: object | undefined | any) => void;
    scheduleNotification: ({ inputs, scheduleTime }: { inputs: NotificationInputs, scheduleTime: number }) => Promise<void>;
}

const helpers: Helpers = {
    getDateString: (dateString: String) => {
        let date = dateString.split(" ")
        return `${date[2]}-${date[1]}-${date[3]}`
    },
    createNotificationChannel: async (): Promise<string | 'clms'> => {
        const existingChannel = await notifee.getChannel('clms');
        if (!existingChannel) {
            const channelId = await notifee.createChannel({
                id: 'clms',
                name: 'CLMS Notifications',
                sound: 'default',
                vibration: true,
                // vibrationPattern: [10, 20, 30, 40],
                importance: AndroidImportance.HIGH,
            });
            return channelId;
        }
        return existingChannel?.id;
    },

    navigateThroughFCM: (name, params) => {
        MainStackNavigatorRef.current?.navigate(name, params);
    },
    scheduleNotification: async ({ inputs, scheduleTime }): Promise<void> => {
        const { title, project_id, client_id, body } = inputs;
        const channelId = await helpers.createNotificationChannel();
        await notifee.createTriggerNotification(
            {
                title,
                body,
                android: {
                    color: '#F5F5F5',
                    sound: 'default',
                    channelId: channelId,
                    smallIcon: 'ic_launcher',
                    largeIcon: 'ic_launcher',
                    importance: AndroidImportance.HIGH,
                },
                ios: {
                    sound: 'default',
                },
                data: {
                    project_id: project_id!,
                    client_id: client_id!,
                },
            },
            {
                type: TriggerType.TIMESTAMP,
                timestamp: Date.now() + scheduleTime * 100,
            }
        );
    },


    checkForEmpty: (value: string): boolean => {
        return value == null || value === 'undefined' || value === '' || value === 'null';
    },

    isEmpty: (value: string): string => {
        return value === '' || value == null || value === 'undefined' || value === undefined ? '' : value;
    },

    emailCheck: (value: string): boolean => {
        return value !== '' && !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(value);
    },

    openCall: ({ phone }: { phone: string }): void => {
        let phoneNumber;
        Platform.OS === 'ios' ? phoneNumber = `telprompt:${phone}` : phoneNumber = `tel:${phone}`;
        Linking.openURL(phoneNumber)
            .then(supported => {
                if (supported) {
                    Linking.openURL(phoneNumber);
                } else {
                    console.log('Phone number is not available');
                }
            })
            .catch(err => console.log('Error inside openCall function: ', err));
    },
    Genders: [
        { short_name: "M", full_name: "Male" },
        { short_name: "F", full_name: "Female" },
        { short_name: "O", full_name: "Others" },
    ],

    linkedInprefix: "https://www.linkedin.com/in/",
    websiteprefix: "https://",
    httpPrefix: "http",
    regexEmail: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    phoneno: /^\d{1,17}$/,
    aadharno: /^\d{12}$/,
};

export default helpers;
