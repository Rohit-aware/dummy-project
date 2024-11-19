import { create } from "zustand";
import { networkRequest } from "../../services/network-request";
import { endpoints } from "../../services/endpoints";

interface UseActionStore {
    activityLoad: boolean;
    addActivity: ({ token, formData }: { token: string, formData: {} }) => Promise<any>;
}

const useActionStore = create<UseActionStore>()((set) => ({
    activityLoad: false,
    addActivity: async ({ token, formData }) => {
        set({ activityLoad: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.addActivity, formData);
            return response.data;
        } catch (error: any) {
            console.log('Error inside addActivity of action store : ', error)
        }
        set({ activityLoad: false });
    }
}));
export default useActionStore;