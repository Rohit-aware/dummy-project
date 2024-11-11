import { create } from "zustand";
import { UseMyLeadStore } from "./interface";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";


const useMyLeadStore = create<UseMyLeadStore>()((set, get) => ({
    leadsData: [],
    page: 0,
    isFinish: false,
    loading: false,
    setIsFinish: ({ value }) => {
        set({ isFinish: value })
    },
    setMyLeadPage: ({ leadPage }) => {
        set({ page: leadPage });
    },
    getLeads: async ({ formData, leadPage, token }) => {
        const currnetData = get().leadsData;
        try {
            set({ loading: true })
            const response = await networkRequest({ token }).post(endpoints.getLeads, formData);
            if (response.data.success === '1') {
                if (leadPage === 0) {
                    set({
                        leadsData: response.data.data
                    });
                } else {
                    set({
                        leadsData: [...currnetData, ...response.data.data]
                    });
                }
            }
            if (response.data.success === '0' && response.data.data?.length === 0 && response.data.total_record == 0) {
                if (leadPage === 0) {
                    set({ leadsData: [] });
                }
                set({ isFinish: true });
            }
            set({ loading: false })
        } catch (error: any) {
            console.log('Error inside useMyLeadStore : ', error)
        }
    }
}));
export default useMyLeadStore;