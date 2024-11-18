import React from "react";
import { useAuthStore, useMyLeadStore, useReloadStore, useShareLeadStore } from "../../../../store";
import { getHashString } from "../../../../utility/hashing";
import { showToast } from "../../../../components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MainStackProps } from "../../../../router/interface";

const useShareLeadHook = () => {
    const { params: { client_id } } = useRoute<RouteProp<MainStackProps, 'ShareLead'>>();
    const { navigate } = useNavigation<any>();
    const [search, setSearch] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);
    const [users, setUsers] = React.useState<any>([]);
    const [btnload, setBtnload] = React.useState(false);

    const { reloadPage } = useReloadStore();
    const { getSingleLeads } = useMyLeadStore();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { getShareClientTeam, isFinish, page, shareClient, shareTeamLoad: loading, teamsData: teams, setPage } = useShareLeadStore();

    const fetchTeam = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getShareClientTeam';
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
            formData.append('search_key', search);
            formData.append('page_number', page);
            formData.append('limit', 20);
            getShareClientTeam({ token, formData, teamPage: page });
        } catch (error) {
            console.log(error, 'error at fetchTeam');
        }
        setRefresh(false);
    };

    const onEndReached = () => {
        if (!isFinish && teams.length > 0) {
            setPage({ page: page + 1 });
            fetchTeam({ page: page + 1 });
        }
    };

    const onRefresh = () => {
        setRefresh(true);
        setPage({ page: 0 });
        fetchTeam({ page: 0 });
    };

    const onCheck = (id: string) => {
        users.includes(id)
            ? setUsers((state: Array<string>) => state.filter((i: string) => i != id))
            : setUsers((state: Array<string>) => [...state, id]);
    };
    const emptyCheck = () => (users.length == 0 ? true : false);

    const onShareSuccesFully = () => {
        setUsers([]);
        setPage({ page: 0 });
        fetchTeam({ page: 0 });
        updateLeadDetail();
    };

    const updateLeadDetail = async () => {
        const fnName = 'getLeads';
        const hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
        const formData = new FormData();
        formData.append('uuid', uuid);
        formData.append('hash_key', hash_key);
        formData.append('client_id', client_id);
        try {
            getSingleLeads({ token, formData });
            reloadPage();
        } catch (error) {
            console.log(error, 'error at updateLeadDetail');
        }
    };

    const shareLeads = async () => {
        if (emptyCheck()) {
            showToast('Please select atleast one employee to share lead');
        } else {
            try {
                setBtnload(true);
                const fnName = 'shareClient';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                formData.append('client_id', client_id);
                formData.append('shared_to', JSON.stringify(users));
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                const response = await shareClient({ token, formData });
                setBtnload(false);
                showToast(response.message);
                if (response.success == 1) {
                    onShareSuccesFully();
                    navigate('ViewLeads', { client_id });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    React.useEffect(() => {
        const delay = search == '' ? 0 : 1000;
        const delayDebounceFn = setTimeout(() => {
            setUsers([]);
            setPage({ page: 0 });
            fetchTeam({ page: 0 });
        }, delay);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);


    return {
        page,
        teams,
        search,
        loading,
        refresh,
        onCheck,
        btnload,
        onRefresh,
        setSearch,
        shareLeads,
        onEndReached,
    };
};
export { useShareLeadHook };