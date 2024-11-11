import { create } from "zustand";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";

const useRegisterStore = create<{ processRegistration: ({ formdata }: { formdata: {} }) => Promise<any> }>()((set) => ({


    processRegistration: async ({ formdata }) => {
        try {
            const response = await networkRequest({}).post(endpoints.processRegistration, formdata);
            return response.data;
        } catch (error: any) {
            console.log("Response Error Inside processRegistration : ", error)
        }
    },
}));
export default useRegisterStore;