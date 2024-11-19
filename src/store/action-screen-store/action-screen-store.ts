import { create } from "zustand";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";

interface UseActionStore {
    activityLoad: boolean;
    sharLoad: boolean;
    teamsLoad: boolean;
    teamIsFinish: boolean;
    teamPage: number;
    setPage: ({ page }: { page: number }) => void;
    teamsData: Array<any>;
    shareLeads: ({ token, formData }: { token: string; formData: {} }) => Promise<any>;
    addActivity: ({ token, formData }: { token: string; formData: {} }) => Promise<any>;
    getTeams: ({ token, formData, page }: { token: string; formData: {}, page: number }) => Promise<any>;
}

const useActionStore = create<UseActionStore>((set) => ({
    activityLoad: false,
    sharLoad: false,
    teamsLoad: false,
    teamIsFinish: false,
    teamPage: 0,
    teamsData: [],
    setPage: ({ page }) => {
        set({ teamPage: page })
    },

    addActivity: async ({ token, formData }) => {
        set({ activityLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.addActivity, formData);
            set({ activityLoad: false });
            return response.data;
        } catch (error: any) {
            console.error("Error inside addActivity of action store:", error);
            set({ activityLoad: false });
            return Promise.reject(error);
        }
    },

    shareLeads: async ({ token, formData }) => {
        set({ sharLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.shareLead, formData);
            set({ sharLoad: false });
            return response.data;
        } catch (error: any) {
            console.error("Error inside addActivity of action store:", error);
            set({ sharLoad: false });
            return Promise.reject(error);
        }
    },

    getTeams: async ({ token, formData, page }) => {
        set({ teamsLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.getMyTeam, formData);
            if (response.data.success === '1') {
                if (page === 0) {
                    set({ teamsData: response.data.data });
                } else {
                    set((state) => ({ teamsData: [...state.teamsData, ...response.data.data] }));
                }
            }
            if (response.data.success === '0' && response.data.data?.length === 0 && response.data.total_record == 0) {
                if (page === 0) {
                    set({ teamsData: [] });
                }
                set({ teamIsFinish: true });
            }
            set({ teamsLoad: false });
        } catch (error: any) {
            console.error("Error inside getTeams of action store:", error);
            set({ teamsLoad: false });
            return Promise.reject(error);
        };
    },
}));

export default useActionStore;
