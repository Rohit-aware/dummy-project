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
    isProjectFilter: null,
    project_status: '',
    client_id: '',
    enableProjectFilter: (inputes) => {
        const { project_status, client_id } = inputes!;
        set({ project_status: project_status!, client_id: client_id! })
    },
    FilterProjects: (data) => {
        set({ isProjectFilter: data })
    },
    setIsFinish: () => {
        set({ isFinish: false })
    },
    setMyProjectPage: ({ projectPage }) => {
        set({ page: projectPage });
    },
    setProjectDetail: ({ data }) => {
        set({ projectDetails: data })
    },
    resetProjectsData: () => {
        set({ projects: [] })
    },
    getSingleProject: async ({ token, formData }) => {
        set({ projectLoad: true })
        const response = await networkRequest({ token }).post(endpoints.getProjects, formData);
        return response.data;
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
        set({ projectLoad: false })
    },
}));
export default useMyProjectStore;