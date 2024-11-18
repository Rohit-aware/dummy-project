import { create } from "zustand";
import { networkRequest } from "../../services/network-request";
import { endpoints } from "../../services/endpoints";

interface useShareLeadStoreProps {
    page: number;
    shareTeamLoad: boolean;
    isFinish: boolean;
    teamsData: Array<any>;
    setPage: ({ page }: { page: number }) => void;
    shareClient: ({ token, formData }: { token: string, formData: {} }) => Promise<any>;
    getShareClientTeam: ({ token, formData, teamPage }: { token: string, formData: {}, teamPage: number }) => void;

}

const useShareLeadStore = create<useShareLeadStoreProps>()((set) => ({
    page: 0,
    teamsData: [],
    isFinish: false,
    shareTeamLoad: false,
    setPage: ({ page }) => {
        set({ page: page })
    },
    shareClient: async ({ token, formData }) => {
        try {
            const repsonse = await networkRequest({ token }).post(endpoints.shareClient, formData);
            return repsonse.data;
        } catch (error) {};
    },
    getShareClientTeam: async ({ token, formData, teamPage }) => {
        set({ shareTeamLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.getShareClientTeam, formData);
            if (response.data.success === '1') {
                if (teamPage === 0) {
                    set({ teamsData: response.data.data });
                } else {
                    set((state) => ({ teamsData: [...state.teamsData, ...response.data.data] }));
                }
            }
            if (response.data.success === '0' && response.data.data?.length === 0 && response.data.total_record == 0) {
                if (teamPage === 0) {
                    set({ teamsData: [] });
                }
                set({ isFinish: true });
            }
            set({ shareTeamLoad: false });
        } catch (error) { };
    },
}));
export default useShareLeadStore;