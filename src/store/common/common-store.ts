import { create } from "zustand";
import { CommonStoreProps } from "./interface";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";



const useCommonStore = create<CommonStoreProps>()((set) => ({
    cityData: [],
    stateData: [],
    orgLoad: false,
    cityLoad: false,
    stateLoad: false,
    organizationData: [],

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

    getCity: async ({ formData }) => {
        try {
            const response = await networkRequest({}).post(endpoints.getAllCity);
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
}));
export default useCommonStore;