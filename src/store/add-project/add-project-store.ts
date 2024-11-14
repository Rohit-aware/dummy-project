import { create } from "zustand";
import { networkRequest } from "../../services/network-request";
import { endpoints } from "../../services/endpoints";


interface UseAddProjectSotreProps {
    createProject: ({ token, formData }: { token: string, formData: {} }) => Promise<any>
}
const useAddProjectSotre = create<UseAddProjectSotreProps>()((set) => ({
    createProject: async ({ token, formData }) => {
        try {
            const response = await networkRequest({ token }).post(endpoints.createProject, formData);
            return response.data;
        } catch (error: any) {
            console.log('Error while createing project isnide createProject : ', error);
        }
    },
}));
export default useAddProjectSotre;