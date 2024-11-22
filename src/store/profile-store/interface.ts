interface ProfileDetailsTypes {
    industry: string;
    first_name: string;
    last_name: string;
    phone_code: number;
    phone: string;
    email: string;
    gender: "M" | "F" | "Other";
    designation: string;
    location: string;
    address: string;
    state_id: number |string;
    city_id: number |string;
    state_name: string;
    city_name: string;
    account_number: string;
    ifsc_code: string;
    pancard_number: string;
    aadhar_number: string;
    target: string;
    pancard: string;
    pancard_path: string;
    aadhar_card: string;
    aadhar_card_path: string;
};



interface UseProfileStoreProps {
    loading: boolean;
    target: string;
    personalDetails: ProfileDetailsTypes;
    achieved: Array<any>;
    years: Array<any>;
    getPersonalDetails: ({ token, formData }: { token: string, formData: {} }) => void;
    getWorkOverview: ({ token, formData }: { token: string, formData: {} }) => void;
};


export type { ProfileDetailsTypes, UseProfileStoreProps };