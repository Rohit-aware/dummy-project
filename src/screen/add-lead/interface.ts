interface UseAddLeadHookReturnType {
    inputs: {
        company_name: string;
        contact_name: string;
        contact_number: string;
        emailId: string;
        linkedIn: string;
        website_url: string;
        address: string;
        state_id: string;
        city_id: string;
        state_name: string;
        city_name: string;
        source: string;
        designation: string;
        skype: string;
        requirement: string;
        outsider_name: string;
        outsider_id: string;
        countrycode: string;
        countryname: string;
    };
    outsiderData: any[];
    cityData: any[];
    stateData: any[];
    sources: any[];
    countryModal: boolean;
    stateLoad: boolean;
    cityLoad: boolean;
    onChangeText: (name: string, value: any) => void;
    addPrefix: ({ name }: {
        name: string;
    }) => void;
    removePrefix: ({ name }: {
        name: string;
    }) => void;
    onSelect: (name: string, data: any) => void;
    onSelectCountry: (country: any) => void;
    openCountryModal: () => void;
    closeCountryModal: () => void;
    addLead: () => void;
};

type SelectName = 'state_name' | 'city_name' | 'outsider_name' | string; // 'string' for default case
type CityItems = {
    city_id: number;
    country_id: number;
    state_id: number;
    city_name: string;
}
type StateItems = {
    state_id: number;
    country_id: number;
    state_name: string;
    gst_code: string;
    state_code: string;
}
export type { UseAddLeadHookReturnType, CityItems, StateItems,SelectName };