import { create } from "zustand";
import { networkRequest } from "../../services/network-request";
import { endpoints } from "../../services/endpoints";
import { UseProfileStoreProps } from "./interface";


const useProfileStore = create<UseProfileStoreProps>()((set) => ({
    loading: false,
    achieved: [],
    target: '',
    years: [],
    personalDetails: {
        industry: '',
        first_name: "",
        last_name: "",
        phone_code: 0,
        phone: "",
        email: "",
        gender: "M",
        designation: "",
        location: "",
        address: '',
        state_id: 0,
        city_id: 0,
        state_name: "",
        city_name: "",
        account_number: '',
        ifsc_code: '',
        pancard_number: '',
        aadhar_number: '',
        target: '',
        pancard: '',
        pancard_path: "",
        aadhar_card: '',
        aadhar_card_path: ""
    },
    getPersonalDetails: async ({ token, formData }) => {
        try {
            set({ loading: true });
            const resp = await networkRequest({ token }).post(endpoints.getPersonalDetails, formData);
            if (resp.data.success === '1') {
                set({ personalDetails: { ...resp.data.data[0] }, });
                set((state) => {
                    let emptyYears = [];
                    if (state.personalDetails) {
                        let yearObj = JSON.parse(state.personalDetails.target);
                        for (let i in yearObj) {
                            emptyYears.push({ [i]: yearObj[i] });
                        };
                    };
                    return {
                        years: emptyYears
                    };
                });
            }
            set({ loading: false });
        } catch (error: any) {
            console.log('Response Errro in getPersionalDetails : ', error);
        }
    },
    getWorkOverview: async ({ formData, token }) => {
        try {
            const resp = await networkRequest({ token }).post(endpoints.getWorkOverview, formData);
            if (resp.data.success === '1') {
                set((state) => {
                    let achievedMonths = [];
                    for (let key in resp.data?.achieved[0]) {
                        achievedMonths.push({ [key]: resp.data?.achieved[0][key] });
                    }
                    return {
                        achieved: achievedMonths,
                        target: resp.data.target,
                    }
                });
            }
        } catch (error: any) {
            console.log('Response Errro in getWorkOverview : ', error);
        }
    },
}));
export default useProfileStore;