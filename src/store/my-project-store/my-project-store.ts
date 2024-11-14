import { create } from "zustand";
import { UseMyProjectStoreProps } from "./interface";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";


const useMyProjectStore = create<UseMyProjectStoreProps>()((set, get) => ({
    page: 0,
    projects: [],
    isFinish: false,
    projectLoad: false,

    setIsFinish: ({ value }) => {
        set({ isFinish: value })
    },
    setMyProjectPage: ({ projectPage }) => {
        set({ page: projectPage });
    },
    getProjects: async ({ token, formData, projectPage }) => {
        set({ projectLoad: true })
        const response = await networkRequest({ token }).post(endpoints.getProjects, formData);
        console.log(JSON.stringify(response.data,undefined,4), ' response.data ')
        if (response.data.success === '1') {
            if (projectPage === 0) {
                set({ projects: response.data.data });
            } else {
                set((state) => ({ projects: [...state.projects, ...response.data.data] }));
            }
        }
        if (response.data.success === '0' && response.data.data?.length === 0 && response.data.total_record == 0) {
            if (projectPage === 0) {
                set({ projects: [] });
            }
            set({ isFinish: true });
        }
    },
}));
export default useMyProjectStore;