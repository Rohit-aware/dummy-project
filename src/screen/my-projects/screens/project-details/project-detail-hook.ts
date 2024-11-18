import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getHashString } from "../../../../utility/hashing";
import { useAuthStore, useMyProjectStore, useProjectDetailsStore, useReloadStore, useStartupStore, useViewTeamStore } from "../../../../store";


const useProjectDetailsHook = () => {
    const { navigate } = useNavigation<any>();
    const [show, setShow] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const { projectDetails: actionData } = useMyProjectStore();
    const onViewTeam = () => {
        resetViewTeamFinishPage()
        navigate('ViewTeam', { details: actionData });
    }

    const {
        activities,
        activityLoad,
        activityPage,
        upcActivities,
        getActivities,
        activityFinsih,
        upcActivityLoad,
        upcActivityPage,
        setActivityPage,
        upcActivityFinsih,
        resetIsFinishPage,
        setUpActivityPage,
        getUpcomingActivities,
    } = useProjectDetailsStore()

    const { reloadPage, reload } = useReloadStore();
    const { resetViewTeamFinishPage } = useViewTeamStore();
    const { deviceId: uuid, user_detail: userData, token } = useAuthStore();
    const { data: { screens: { project_detail } = {} } = {} } = useStartupStore();
    const [active, setActive] = React.useState<'Activities' | 'Upcoming' | ''>(project_detail?.activity ? 'Activities' : project_detail?.upcoming_activity ? 'Upcoming' : '');

    const open = () => setShow(true);
    const close = () => setShow(false);

    const fetchActivities = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getActivities';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );
            const formData = new FormData();
            formData.append('page_number', page);
            formData.append('project_id', actionData.project_id);
            formData.append('limit', 10);
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('is_project', 'yes');
            getActivities({ token, formData, page });
        } catch (error) {
            console.log(error, 'error inside fetchActivities api');
        } finally {
            setRefresh(false);
        };

    };

    const fetchUpcoming = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getUpcomingActivities';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );
            const formData = new FormData();
            formData.append('page_number', page);
            formData.append('project_id', actionData.project_id);
            formData.append('limit', 10);
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('is_project', 'yes');
            getUpcomingActivities({ token, formData, page });
        } catch (error) {
            console.log(error, 'error inside fetchUpcoming api');
        } finally {
            setRefresh(false);
        };

    };

    const onEndActivity = () => {
        if (!activityFinsih && activities.length > 0 && !activityLoad) {
            let page = activityPage + 1;
            setActivityPage({ page });
            fetchActivities({ page })
        }
    };
    const onEndUpcActivity = () => {
        if (!upcActivityFinsih && upcActivities.length > 0 && !upcActivityLoad) {
            let page = activityPage + 1;
            setUpActivityPage({ page });
            fetchUpcoming({ page })
        }
    }
    const onRefresh = async () => {
        resetIsFinishPage();
        setRefresh(true);
        reloadPage();
    };

    React.useEffect(() => {
        fetchActivities({ page: 0 });
        fetchUpcoming({ page: 0 });
    }, [reload]);


    return {
        show,
        close,
        open,
        active,
        refresh,
        onRefresh,
        setActive,
        actionData,
        activities,
        onViewTeam,
        activityLoad,
        activityPage,
        onEndActivity,
        upcActivities,
        upcActivityLoad,
        upcActivityPage,
        onEndUpcActivity,
    };
};
export { useProjectDetailsHook };