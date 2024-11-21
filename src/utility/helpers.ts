import { Linking, Platform } from 'react-native';
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

interface NotificationInputs {
    activity_type: "Online Meeting" | "Client Meeting" | "";
    agenda: string;
    project_id?: string | number
    client_id?: string | number 
}
interface Helpers {
    httpPrefix: string;
    websiteprefix: string;
    linkedInprefix: string;
    isEmpty: (value: string) => string;
    emailCheck: (value: string) => boolean;
    checkForEmpty: (value: string) => boolean;
    openCall: ({ phone }: { phone: string }) => void;
    createNotificationChannel: () => Promise<string | ''>;
    scheduleNotification: ({ inputs, now }: { inputs: NotificationInputs, now: number }) => Promise<void>;
}

const helpers: Helpers = {
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

    scheduleNotification: async ({ inputs, now }): Promise<void> => {
        const { activity_type, project_id, client_id, agenda } = inputs;
        const channelId = await helpers.createNotificationChannel();
        await notifee.createTriggerNotification(
            {
                title: activity_type,
                body: agenda,
                android: {
                    channelId: channelId,
                    smallIcon: 'ic_launcher',
                    largeIcon: 'ic_launcher',
                    sound: 'default',
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
                timestamp: Date.now() + now * 100,
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

    linkedInprefix: "https://www.linkedin.com/in/",

    websiteprefix: "https://",

    httpPrefix: "http",
};

export default helpers;
