import { ProjectDataType } from "../store/my-project-store/interface";

type MainStackProps = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    ForgotPassSuccess: undefined;
    AddLead: undefined;
    BottomTab: {
        Dashboard: undefined;
        MyLeads: undefined;
        MyProjects: undefined;
        MyProfile: undefined;
    };
    LeadDetails: undefined;
    AddProject: undefined;
    EditLead: undefined;
    Notes: undefined;
    AddNotes: undefined;
    ChangePassword: undefined;
    ShareLead: {
        client_id: string
    };
    ViewLeads: {
        client_id: string
    };
    ViewTeam: {
        details: Partial<ProjectDataType>
    }
    ProjectDetails: {
        project_id?: string | number
    };
    AddActivities: undefined;
    ShareProject: undefined;
    AddUpcomingActivities: undefined;
    UpdateProjectStatus: undefined;
    CreateReminder: undefined;
    Activities: undefined;
    Reminders: undefined;
    FollowUpToday: undefined;
    FilterMyProjects: undefined;
    FilterMyLeads: undefined;
    EditProfile: undefined;
    FileViewer: {
        data: { filePath: string, filename: string },
    };
};

export type { MainStackProps };