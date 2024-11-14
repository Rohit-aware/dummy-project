import { create } from "zustand";
import { CommonStoreProps } from "./interface";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";



const useCommonStore = create<CommonStoreProps>()((set) => ({
    cityData: [],
    stateData: [],
    outsiderData: [],
    projectStatus: [],
    sources: [],
    call_status: [],
    orgLoad: false,
    cityLoad: false,
    stateLoad: false,
    outsiderLoad: false,
    organizationData: [],
    requirementTypes: [],

    getAllOrganization: async () => {
        try {
            const response = await networkRequest({}).post(endpoints.getAllOrganization);
            if (response.data.success === '1') {
                set({
                    organizationData: response.data.data,
                    orgLoad: false,
                });
            } else {
                set({ orgLoad: false });
            }
        } catch (error: any) {
            console.log('Response Error inside getAllOrganization : ', error)
        }
    },

    getStates: async () => {
        try {
            const response = await networkRequest({}).post(endpoints.getAllState);
            if (response.data.success === '1') {
                set({
                    stateData: response.data.data,
                    stateLoad: false,
                });
            } else {
                set({ stateLoad: false });
            }
        } catch (error: any) {

        }
    },

    getCity: async ({ token, formData }) => {
        try {
            const response = await networkRequest({ token }).post(endpoints.getAllCity, formData);
            if (response.data.success === '1') {
                set({
                    cityData: response.data.data,
                    cityLoad: false,
                });
            } else {
                set({ cityLoad: false });
            }
        } catch (error: any) {

        }
    },
    getOutsiders: async ({ token, formData }) => {
        set({ outsiderLoad: true })
        try {
            const response = await networkRequest({ token }).post(endpoints.getOutsiders, formData);
            if (response.data.success === '1') {
                set({ outsiderData: response.data.data })
            }
        } catch (error: any) {
            console.log('Error inside getOutSiders function : ', error)
        }
        set({ outsiderLoad: false })
    },

    getMasterData: async ({ token, formData }) => {
        try {
            const response = await networkRequest({ token }).post(endpoints.getMasterData, formData);
            if (response.data.success === '1') {
                set({
                    projectStatus: response.data.data.project_status,
                    sources: response.data.data.source,
                    call_status: response.data.data.call_status,
                })
            }
        } catch (error: any) {
            console.log('Error inside getMasterData function : ', error)
        }
    },
    getRequirementType: async ({ token, formData }) => {
        try {
            const response = await networkRequest({ token }).post(endpoints.getRequirementType, formData);
            if (response.data.success === '1') {
                set({ requirementTypes: response.data.data })
            }
        } catch (error: any) {
            console.log('Error inside getMasterData function : ', error)
        }
    }
}));
export default useCommonStore;