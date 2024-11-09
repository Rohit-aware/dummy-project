interface User {
    user_id?: number;
    user_email?: string;
    phone_code?: number;
    user_phone?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    gender?: 'M' | 'F'; // Assuming gender can either be 'M' or 'F'
    state_id?: number | null; // state_id can be null
    city_id?: number | null; // city_id can be null
    designation?: string;
    last_login?: string; // Can be a string, ideally a date object, but we'll use string for simplicity
    mkey?: string;
    msalt?: string;
    token?: string;
}

// Define the AuthStore interface
interface AuthStore {
    loader: boolean;
    user_detail: User;
    token: string;
    errorMessage: string | null;
    deviceId: string;
    updateDeviceId: (id: string) => void;
    processDoLogin: ({ formData }: { formData: {} }) => Promise<any>;
    updateMyDeviceId: ({ token, formData }: { token: string, formData: {} }) => void;
}
export type { AuthStore }