import { create } from "zustand";
import { UseMyProjectStoreProps } from "./interface";
import { endpoints } from "../../services/endpoints";
import { networkRequest } from "../../services/network-request";


const useMyProjectStore = create<UseMyProjectStoreProps>()((set, get) => ({
    page: 0,
    projects: [],
    projectDetails: {},
    isFinish: false,
    projectLoad: false,

    setIsFinish: () => {
        set({ isFinish: false })
    },
    setMyProjectPage: ({ projectPage }) => {
        set({ page: projectPage });
    },
    getProjectDetail: ({ data }) => {
        set({ projectDetails: data })
    },
    getProjects: async ({ token, formData, projectPage }) => {
        set({ projectLoad: true })
        const response = await networkRequest({ token }).post(endpoints.getProjects, formData);
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