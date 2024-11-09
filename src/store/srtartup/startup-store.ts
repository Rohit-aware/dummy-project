import { create } from 'zustand';
import { endpoints } from '../../services/endpoints';
import { networkRequest } from '../../services/network-request';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StartupTypes } from './interface';


interface StartupState {
    data: StartupTypes;
    loading: boolean;
    error: string;
    fetchStartup: ({ token }: { token: string }) => Promise<void>;
}

const useStartupStore = create<StartupState>()(
    persist(
        (set) => ({
            data: {
                screens: {
                    bottom_nav: {
                        home: false,
                        leads: false,
                        add_lead_icon: false,
                        projects: false,
                        profiles: false
                    },
                    home: {
                        leads: false,
                        projects: false,
                        projects_followup: false,
                        today_activities: false,
                        today_reminders: false,
                        today_follow_ups: false
                    },
                    profile: {
                        profile_details: false,
                        work_overview: false,
                        edit_profile: false,
                        change_password: false
                    },
                    lead_listing: {
                        add_project: false
                    },
                    lead_detail: {
                        call_icon: false,
                        share_lead: false,
                        add_note_icon: false,
                        add_project: false,
                        edit_lead: false
                    },
                    project_detail: {
                        call_icon: false,
                        view_team: false,
                        activity: false,
                        upcoming_activity: false,
                        actions: false,
                        share_project_action: false,
                        add_activities: false,
                        add_upcoming_activities: false,
                        update_project_status: false,
                        create_reminder: false
                    }
                },
                mandatory_update: false,
                redirection_url: null,
                edit_allowed: false,
                share_allowed: false
            },
            loading: false,
            error: '',

            fetchStartup: async ({ token }) => {
                set({ loading: true, error: '' });

                try {
                    const resp = await networkRequest({ token }).post(endpoints.startup);
                    if (resp.data.success === '1') {
                        set({ data: resp.data.data, loading: false });
                    } else {
                        set({ loading: false });
                    }
                } catch (error: any) {
                    set({ error: error.message || 'An error occurred', loading: false });
                    console.log('error inside startup: ', error);
                }
            },
        }),
        {
            name: 'startup-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);

export default useStartupStore;
