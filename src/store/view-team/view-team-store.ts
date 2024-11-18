import { create } from "zustand";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";

type Payload = { token: string, formData: {}, page: number };

interface UseViewTeamStore {
    teamsData: Array<any>;
    page: number;
    loading: boolean;
    isFinish: boolean;
    resetViewTeamFinishPage: () => void;
    setPage: ({ page }: { page: number }) => void;
    getViewTeamsList: ({ token, formData, page }: Payload) => Promise<any>;
};


const useViewTeamStore = create<UseViewTeamStore>()((set) => ({
    teamsData: [],
    page: 0,
    isFinish: false,
    loading: false,
    resetViewTeamFinishPage: () => {
        set({ page: 0, isFinish: false })
    },
    setPage: ({ page }) => {
        set({ page })
    },
    getViewTeamsList: async ({ token, formData, page }) => {
        set({ loading: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.viewTeam, formData);
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
                set({ isFinish: true });
            }
            set({ loading: false });
        } catch (error) { };
    },
}));
export default useViewTeamStore;