import React from "react";
import { getHashString } from "../../../../utility/hashing";
import { useAuthStore, useViewLeadStore } from "../../../../store";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MainStackProps } from "../../../../route/interface";



const useViewLeadHook = () => {
    const { params: { client_id } } = useRoute<RouteProp<MainStackProps, 'ViewLead'>>()
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { getLeadUsers, isFinish, page, setPage, teamsData: team, teamLoad: loading } = useViewLeadStore();
    const [refresh, setRefresh] = React.useState(false);

    const fetchTeam = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getLeadUsers';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );
            const formData = new FormData();
            formData.append('client_id', client_id);
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('page_number', page);
            formData.append('limit', 20);
            getLeadUsers({ token, formData, teamPage: page });
        } catch (error) {
            console.log(error, 'error at fetchTeam of ViewLeads');
        }
        setRefresh(false);
    };

    const onEndReached = () => {
        if (!isFinish) {
            setPage({ page: page + 1 });
            fetchTeam({ page: page + 1 });
        }
    };

    const onRefresh = () => {
        setRefresh(true);
        setPage({ page: 0 });
        fetchTeam({ page: 0 });
    };

    React.useEffect(() => {
        fetchTeam({ page: 0 });
    }, []);

    return {
        page,
        team,
        refresh,
        loading,
        onRefresh,
        onEndReached,
    };
};
export { useViewLeadHook };