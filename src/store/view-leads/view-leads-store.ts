import { create } from "zustand";
import { networkRequest } from "../../services/network-request";
import { endpoints } from "../../services/endpoints";

interface useViewLeadStoreProps {
    page: number;
    teamLoad: boolean;
    isFinish: boolean;
    teamsData: Array<any>;
    setPage: ({ page }: { page: number }) => void;
    getLeadUsers: ({ token, formData, teamPage }: { token: string, formData: {}, teamPage: number }) => void;

}

const useViewLeadStore = create<useViewLeadStoreProps>()((set) => ({
    page: 0,
    teamsData: [],
    isFinish: false,
    teamLoad: false,
    setPage: ({ page }) => {
        set({ page: page })
    },
    getLeadUsers: async ({ token, formData, teamPage }) => {
        set({ teamLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.getLeadUsers, formData);
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
            set({ teamLoad: false });
        } catch (error) { };
    },
}));
export default useViewLeadStore;