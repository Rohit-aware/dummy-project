import { ProjectDataType } from "../../../../store/my-project-store/interface";

interface ProjectDetailsType {
    show: boolean;
    upcActivities: any[];
    project_detail: {
        call_icon: boolean;
        view_team: boolean;
        activity: boolean;
        upcoming_activity: boolean;
        actions: boolean;
        share_project_action: boolean;
        add_activities: boolean;
        add_upcoming_activities: boolean;
        update_project_status: boolean;
        create_reminder: boolean;
    } | undefined;
    upcActivityLoad: boolean;
    upcActivityPage: number;
    onEndUpcActivity: () => void;
    close: () => void;
    open: () => void;
    active: "" | "Activities" | "Upcoming";
    refresh: boolean;
    onRefresh: () => Promise<void>;
    setActive: React.Dispatch<React.SetStateAction<"" | "Activities" | "Upcoming">>;
    actionData: Partial<ProjectDataType>;
    activities: any[];
    onViewTeam: () => void;
    activityLoad: boolean;
    activityPage: number;
    onEndActivity: () => void;
};
export type { ProjectDetailsType };