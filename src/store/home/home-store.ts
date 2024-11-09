import { create } from 'zustand';
import { DashboardStore } from './interface';
import { endpoints } from '../../services/endpoints';
import { networkRequest } from '../../services/network-request';

const useHomeStore = create<DashboardStore>((set) => ({
    data: {
        totalLeads: '',
        leadsToday: '',
        totalProjects: '',
        projectsToday: '',
        ProjectsUnderDiscussion: '',
        ProjectsConverted: '',
        activitiesToday: '',
        remindersToday: '',
        followupsToday: ''
    },
    loading: false,

    getDashboardData: async ({ token, formData }) => {
        set({ loading: true });
        try {
            const response = await networkRequest({ token }).post(endpoints.dashboard, formData);
            if (response.data.success === '1') {
                set({
                    data: response.data.data,
                    loading: false,
                });
            } else {
                set({ loading: false });
            }
        } catch (error) {
            set({ loading: false });
            console.error('Error fetching dashboard data:', error);
        }
    },

    clearDashboardData: () => {
        set({
            data: {
                totalLeads: '',
                leadsToday: '',
                totalProjects: '',
                projectsToday: '',
                ProjectsUnderDiscussion: '',
                ProjectsConverted: '',
                activitiesToday: '',
                remindersToday: '',
                followupsToday: ''
            },
            loading: false,
        });
    }
}));

export default useHomeStore;
