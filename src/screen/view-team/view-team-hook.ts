import React from "react";
import { useRoute } from "@react-navigation/native";
import { getHashString } from "../../utility/hashing";
import { useAuthStore, useViewTeamStore } from "../../store";



const useViewTeamHook = () => {
    const route = useRoute<any>();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { project_id } = route.params.details;
    const { getViewTeamsList, isFinish, page, setPage, loading, teamsData: teams, resetViewTeamFinishPage } = useViewTeamStore();
    const [refresh, setRefresh] = React.useState(false);

    const fetchTeam = async ({ page }: { page: number }) => {
        try {
            const fnName = 'viewTeam';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );
            const formData = new FormData();
            formData.append('project_id', project_id);
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('page_number', page);
            formData.append('limit', 20);
            getViewTeamsList({ token, formData, page })
        } catch (error) {
            console.log(error, 'error at fetchTeam of ViewLeads');
        } finally {
            setRefresh(false);
        }
    };

    const onEndReached = () => {
        if (!isFinish && teams.length > 0 && !loading) {
            setPage({ page: page + 1 });
            fetchTeam({ page: page + 1 });
        }
    };

    const onRefresh = () => {
        setRefresh(true);
        resetViewTeamFinishPage()
        setPage({ page: 0 });
        fetchTeam({ page: 0 });
    };

    React.useEffect(() => {
        fetchTeam({ page: 0 });
    }, []);



    return {
        page,
        teams,
        loading,
        refresh,
        isFinish,
        onRefresh,
        onEndReached,
    };
};
export { useViewTeamHook };