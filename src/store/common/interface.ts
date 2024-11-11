interface CommonStoreProps {
    orgLoad: boolean;
    cityLoad: boolean;
    stateLoad: boolean;
    organizationData: Array<any>;
    stateData: Array<any>;
    cityData: Array<any>;
    getAllOrganization: () => void;
    getStates: () => void;
    getCity: ({ formData }: { formData: {} }) => void;
}
export type { CommonStoreProps }