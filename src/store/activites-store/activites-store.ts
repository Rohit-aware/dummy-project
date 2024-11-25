import { create } from "zustand";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";
import { ProjectDataType } from "../my-project-store/interface";

type Payload = { token: string, formData: {}, page: number };

interface UseActivitiesStore {
    upcActivities: Array<any>;
    upcActivityLoad: boolean;
    upcActivityPage: number;
    upcActivityFinsih: boolean;
    resetIsFinishPage: () => void;
    projectDetail: Partial<ProjectDataType>;
    setUpActivityPage: ({ page }: { page: number }) => void;
    getUpcomingActivities: ({ token, formData, page }: Payload) => Promise<any>;
}

const useActivitiesStore = create<UseActivitiesStore>()((set) => ({

    activities: [],
    activityLoad: false,
    activityFinsih: false,
    activityPage: 0,
    upcActivities: [],
    upcActivityLoad: false,
    upcActivityFinsih: false,
    upcActivityPage: 0,
    projectDetail: {},
    resetIsFinishPage: () => {
        set({
            upcActivityPage: 0,
            upcActivityFinsih: false,
        })
    },
    setUpActivityPage: ({ page }) => {
        set({ upcActivityPage: page })
    },
    getUpcomingActivities: async ({ formData, page, token }) => {
        set({ upcActivityLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.getUpcomingActivities, formData);
            if (response.data.success === '1') {
                if (page === 0) {
                    set({ upcActivities: response.data.data });
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
export default useActivitiesStore;