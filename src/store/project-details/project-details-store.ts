import { create } from "zustand";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";

type Payload = { token: string, formData: {}, page: number };

interface UseProjectDetailsStore {
    activities: Array<any>;
    activityPage: number;
    activityLoad: boolean;
    activityFinsih: boolean;
    upcActivities: Array<any>;
    upcActivityLoad: boolean;
    upcActivityFinsih: boolean;
    upcActivityPage: number;
    resetIsFinishPage: () => void;
    setActivityPage: ({ page }: { page: number }) => void;
    setUpActivityPage: ({ page }: { page: number }) => void;
    getActivities: ({ token, formData, page }: Payload) => Promise<any>;
    getUpcomingActivities: ({ token, formData, page }: Payload) => Promise<any>;
}

const useProjectDetailsStore = create<UseProjectDetailsStore>()((set) => ({

    activities: [],
    activityLoad: false,
    activityFinsih: false,
    activityPage: 0,
    upcActivities: [],
    upcActivityLoad: false,
    upcActivityFinsih: false,
    upcActivityPage: 0,
    resetIsFinishPage: () => {
        set({
            activityPage: 0,
            upcActivityPage: 0,
            activityFinsih: false,
            upcActivityFinsih: false,
        })
    },
    setActivityPage: ({ page }) => {
        set({ activityPage: page })
    },
    setUpActivityPage: ({ page }) => {
        set({ upcActivityPage: page })
    },
    getActivities: async ({ formData, page, token }) => {
        set({ activityLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.getActivities, formData);
            if (response.data.success === '1') {
                if (page === 0) {
                    set({ activities: response.data.data });
                } else {
                    set((state) => ({ activities: [...state.activities, ...response.data.data] }));
                }
            }
            if (response.data.success === '0' && response.data.data?.length === 0 && response.data.total_record == 0) {
                if (page === 0) {
                    set({ activities: [] });
                }
                set({ activityFinsih: true });
            }
            set({ activityLoad: false });
        } catch (error) { };
    },
    getUpcomingActivities: async ({ formData, page, token }) => {
        set({ upcActivityLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.getUpcomingActivities, formData);
            if (response.data.success === '1') {
                if (page === 0) {
                    set({ activities: response.data.data });
                } else {
                    set((state) => ({ upcActivities: [...state.upcActivities, ...response.data.data] }));
                }
            }
            if (response.data.success === '0' && response.data.data?.length === 0 && response.data.total_record == 0) {
                if (page === 0) {
                    set({ upcActivities: [] });
                }
                set({ upcActivityFinsih: true });
            }
            set({ upcActivityLoad: false });
        } catch (error) { };
    },

}));
export default useProjectDetailsStore;