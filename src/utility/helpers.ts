import { Helpers } from './interface';
import { Linking, Platform } from 'react-native';
import { MainStackNavigatorRef } from '../hooks/mainstack-navigation-ref';
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';



const helpers: Helpers = {
    getDateString: (dateString) => {
        let date = dateString.split(" ")
        return `${date[2]}-${date[1]}-${date[3]}`
    },

    createNotificationChannel: async () => {
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
    onDisplayNotification: async (remoteMessage) => {
        console.log(remoteMessage, 'remoteMessage inside onDisplayNotification')
        await notifee.displayNotification({
            title: remoteMessage.notification!.title,
            body: remoteMessage.notification!.body,
            data: { ...remoteMessage.data },
            android: {
                channelId: 'clms',
                color: '#f0f0f0',
                sound: "default",
                pressAction: {
                    id: 'default',
                    launchActivity: 'default',
                },
                largeIcon: 'ic_launcher',
                smallIcon: 'ic_clms',
                importance: AndroidImportance.HIGH,
            },
            ios: {
                sound: 'default',
            },
        });
    },

    scheduleNotification: async ({ inputs, scheduleTime }) => {
        const { title, project_id, client_id, body } = inputs;
        // const channelId = await helpers.createNotificationChannel();
        const timestamp = Date.now() + scheduleTime * 1000;
        await notifee.createTriggerNotification(
            {
                title,
                body,
                android: {
                    sound: 'default',
                    color: '#f0f0f0',
                    channelId: 'clms',
                    smallIcon: 'ic_clms',
                    largeIcon: 'ic_launcher',
                    importance: AndroidImportance.HIGH,
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
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
                timestamp,
            }
        );
    },

    checkForEmpty: (value) => {
        return value == null || value === 'undefined' || value === '' || value === 'null';
    },

    isEmpty: (value) => {
        return value === '' || value == null || value === 'undefined' || value === undefined ? '' : value;
    },

    emailCheck: (value) => {
        return value !== '' && !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(value);
    },

    openCall: ({ phone }) => {
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
