interface ScreensConfig {
    bottom_nav: {
        home: boolean;
        leads: boolean;
        add_lead_icon: boolean;
        projects: boolean;
        profiles: boolean;
    };
    home: {
        leads: boolean;
        projects: boolean;
        projects_followup: boolean;
        today_activities: boolean;
        today_reminders: boolean;
        today_follow_ups: boolean;
    };
    profile: {
        profile_details: boolean;
        work_overview: boolean;
        edit_profile: boolean;
        change_password: boolean;
    };
    lead_listing: {
        add_project: boolean;
    };
    lead_detail: {
        call_icon: boolean;
        share_lead: boolean;
        add_note_icon: boolean;
        add_project: boolean;
        edit_lead: boolean;
    };
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
    };
}

interface StartupTypes {
    screens: ScreensConfig;
    mandatory_update: boolean;
    redirection_url: string | null;
    edit_allowed: boolean;
    share_allowed: boolean;
}
export type { StartupTypes }