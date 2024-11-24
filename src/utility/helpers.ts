import { Linking, Platform } from 'react-native';
import { useUpdateProjectDetail } from '../hooks';
import useUpdateLeadDetails from '../hooks/update-lead-details-hook';
import { MainStackNavigatorRef } from '../hooks/mainstack-navigation-ref';
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

interface NotificationInputs {
    title: string;
    body: string;
    project_id?: string | number
    client_id?: string | number
};

interface Helpers {
    phoneno: RegExp;
    aadharno: RegExp;
    regexEmail: RegExp;
    httpPrefix: string;
    websiteprefix: string;
    linkedInprefix: string;
    isEmpty: (value: string) => string;
    emailCheck: (value: string) => boolean;
    getDateString: (value: string) => string;
    checkForEmpty: (value: string) => boolean;
    navigate: (name: string, id: string) => void;
    openCall: ({ phone }: { phone: string }) => void;
    createNotificationChannel: () => Promise<string | ''>;
    Genders: Array<{ short_name: string; full_name: string; }>
    navigateThroughFCM: (name?: string | any, params?: object | undefined | any) => void;
    scheduleNotification: ({ inputs, scheduleTime }: { inputs: NotificationInputs, scheduleTime: number }) => Promise<void>;
}

const helpers: Helpers = {
    getDateString: (dateString: String) => {
        let date = dateString.split(" ")
        return `${date[2]}-${date[1]}-${date[3]}`
    },
    navigate: async (name: string, id: string) => {
        const { updateProjectDetail } = useUpdateProjectDetail();
        const { updateLeadDetail } = useUpdateLeadDetails();

        if (MainStackNavigatorRef.current && MainStackNavigatorRef.current.isReady()) {
            let result;
            if (name == "ProjectDetails") {
                result = await updateProjectDetail(id);
                result && helpers.navigateThroughFCM('ProjectDetails');
            } else if (name == "LeadDetails") {
                result = await updateLeadDetail(id);
                result && helpers.navigateThroughFCM('LeadDetails');
            }
        }
    },
    createNotificationChannel: async (): Promise<string | 'clms'> => {
        const existingChannel = await notifee.getChannel('clms');
        if (!existingChannel) {
            const channelId = await notifee.createChannel({
                id: 'clms',
                name: 'CLMS Notifications',
                sound: 'default',
                vibration: true,
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
        // const channelId = await helpers.createNotificationChannel();
        await notifee.createTriggerNotification(
            {
                title,
                body,
                android: {
                    color: '#F5F5F5',
                    sound: 'default',
                    channelId: 'clms',
                    smallIcon: 'ic_launcher',
                    largeIcon: 'ic_launcher',
                    importance: AndroidImportance.HIGH,
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
                        mainComponent: 'AppEntry'
                    },
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
