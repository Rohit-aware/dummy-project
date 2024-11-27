import { create } from "zustand";
import { UseMyLeadStore } from "./interface";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";


const useMyLeadStore = create<UseMyLeadStore>()((set, get) => ({
    page: 0,
    leadsData: [],
    loading: false,
    isFinish: false,
    leadsFilter: null,
    leadDetails: {
        company_name: '',
        contact_person: '',
        phone: '',
        email: '',
        linkedin_url: '',
        website_url: '',
        address: '',
        state_id: '',
        city_id: '',
        state_name: '',
        city_name: '',
        source: '',
        person_role: '',
        skype: '',
        remark: '',
        outsider_name: '',
        outsider_id: '',
        country_name: '',
        created_on: '',
        share_lead: '',
        shared_count: '',
        client_id: '',
        country_id: '91',
        share_allowed: 'Y',
        edit_allowed: 'Y',
        closed_projects: 0,
        project_count: 0,
    },
    FilterLeads(data) {
        set({ leadsFilter: data })
    },
    setLeadDetails: ({ value }) => {
        set({ leadDetails: { ...value } })
    },
    setIsFinish: () => {
        set({ isFinish: false })
    },
    setMyLeadPage: ({ leadPage }) => {
        set({ page: leadPage });
    },
    getLeads: async ({ formData, leadPage, token }) => {
        try {
            set({ loading: true })
            const response = await networkRequest({ token }).post(endpoints.getLeads, formData);
            if (response.data.success === '1') {
                if (leadPage === 0) {
                    set({ leadsData: response.data.data });
                } else {
                    set((state) => ({
                        leadsData: [...state.leadsData, ...response.data.data]
                    }))
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
    },
    getSingleLeads: async ({ formData, token }) => {
        try {
            set({ loading: true })
            const response = await networkRequest({ token }).post(endpoints.getLeads, formData);
            if (response.data.success == 1) {
                set({ leadDetails: { ...response.data.data[0] } });
            }
            set({ loading: false });
            return response.data;
        } catch (error: any) {
            console.log('Error inside useMyLeadStore : ', error)
        }
    }
}));
export default useMyLeadStore;