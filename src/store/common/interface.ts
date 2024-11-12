interface CommonStoreProps {
    orgLoad: boolean;
    cityLoad: boolean;
    stateLoad: boolean;
    outsiderLoad: boolean;
    stateData: Array<any>;
    projectStatus: Array<any>;
    sources: Array<any>;
    call_status: Array<any>;
    cityData: Array<any>;
    outsiderData: Array<any>;
    organizationData: Array<any>;
    getAllOrganization: () => void;
    getStates: () => void;
    getCity: ({ token, formData }: { token: string, formData: {} }) => void;
    getOutsiders: ({ formData, token }: { formData: {}, token: string }) => void;
    getMasterData: ({ formData, token }: { formData: {}, token: string }) => void;
}
export type { CommonStoreProps }