import { create } from "zustand";
import { networkRequest } from "../../services/network-request";
import { endpoints } from "../../services/endpoints";

interface UseAddLeadStore {
    createlead: ({ formData, token }: { token: string, formData: {} }) => Promise<any>;
}

const useAddLeadStore = create<UseAddLeadStore>()(() => ({
    createlead: async ({ token, formData }) => {
        try {
            const response = await networkRequest({ token }).post(endpoints.createLead, formData);
            return response.data;
        } catch (error: any) {
            console.log('Error while creating Lead  : ', error)
        };
    }
}));
export default useAddLeadStore;