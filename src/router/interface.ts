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
    ShareLead: {
        client_id: string
    };
    ViewLeads: {
        client_id: string
    };
    ViewTeam: {
        details: Partial<ProjectDataType>
    }
    ProjectDetails: undefined;
    AddActivities: undefined;
};

export type { MainStackProps };