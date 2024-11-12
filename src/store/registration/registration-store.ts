import { create } from "zustand";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";
interface useRegisterStoreProps {
    loading: boolean;
    processRegistration: ({ formdata }: { formdata: {} }) => Promise<any>
}

const useRegisterStore = create<useRegisterStoreProps>()((set) => ({
    loading: false,
    processRegistration: async ({ formdata }) => {
        set({ loading: true });
        try {
            const response = await networkRequest({}).post(endpoints.processRegistration, formdata);
            return response.data;
        } catch (error: any) {
            console.log("Response Error Inside processRegistration : ", error)
        }
        set({ loading: false });
    },
}));
export default useRegisterStore;