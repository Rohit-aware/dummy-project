import { create } from "zustand";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";
interface UseRemindersStoreProps {
    reminders: any[];
    isFinish: boolean;
    loading: boolean;
    page: number;
    resetPageIsFinish: () => void;
    setPage: ({ page }: { page: number }) => void;
    getReminders: ({ formData, page, token }: { formData: {}, page: number, token: string }) => void;
};

const useRemindersStore = create<UseRemindersStoreProps>()((set) => ({

    reminders: [],
    isFinish: false,
    loading: false,
    page: 0,
    setPage: ({ page }) => {
        set({ page })
    },
    resetPageIsFinish: () => {
        set({ page: 0, isFinish: false })
    },
    getReminders: async ({ formData, page, token }) => {
        try {
            set({ loading: true })
            const response = await networkRequest({ token }).post(endpoints.getReminders, formData);
            if (response.data.success === '1') {
                if (page === 0) {
                    set({ reminders: response.data.data });
                } else {
                    set((state) => ({
                        reminders: [...state.reminders, ...response.data.data]
                    }))
                }
            }
            if (response.data.success === '0' && response.data.data?.length === 0 && response.data.total_record == 0) {
                if (page === 0) {
                    set({ reminders: [] });
                }
                set({ isFinish: true });
            }
            set({ loading: false })
        } catch (error: any) {
            console.log('Error inside useMyLeadStore : ', error)
        }
    },
}));
export default useRemindersStore;