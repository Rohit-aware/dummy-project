// types.ts
interface DashboardData {
    totalLeads: string,
    leadsToday: string,
    totalProjects: string,
    projectsToday: string,
    ProjectsUnderDiscussion: string,
    ProjectsConverted: string,
    activitiesToday: string,
    remindersToday: string,
    followupsToday: string
}

interface DashboardStore {
    data: DashboardData;
    loading: boolean;
    getDashboardData: ({ token, formData }: { token: string, formData: object }) => Promise<void>;
    clearDashboardData: () => void;
}
export type { DashboardData, DashboardStore }