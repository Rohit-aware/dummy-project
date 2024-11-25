import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

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
    onDisplayNotification: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void>;
    navigateThroughFCM: (name?: string | any, params?: object | undefined | any) => void;
    scheduleNotification: ({ inputs, scheduleTime }: { inputs: NotificationInputs, scheduleTime: number }) => Promise<void>;
};

export type { Helpers };