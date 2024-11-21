import React from "react";
import { showToast } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { getHashString } from "../../../utility/hashing";
import { useActionStore, useAuthStore, useMyProjectStore, useProjectDetailsStore } from "../../../store";



const useShareProjectHook = () => {

    const navigation = useNavigation<any>();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();

    const {
        getTeams,
        setPage,
        teamPage,
        shareLeads,
        teamsLoad: loading,
        teamsData: teams,
        activityLoad: btnload,
        teamIsFinish: isFinish,
    } = useActionStore();

    const { project_id } = useProjectDetailsStore(state => state.projectDetail);
    const projectData = useMyProjectStore(state => state.projectDetails);


    const [search, setSearch] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);
    const [users, setUsers] = React.useState<Array<string>>([]);

    const fetchTeam = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getMyTeam';
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
            search && formData.append('search_key', search);
            formData.append('page_number', page);
            formData.append('limit', 20);
            getTeams({ token, formData, page })
        } catch (error) {
            console.log(error, 'error at fetchTeam');
        }
        setRefresh(false);
    };

    const onEndReached = () => {
        if (!isFinish && teams.length > 0 && !loading) {
            setPage({ page: teamPage + 1 });
            fetchTeam({ page: teamPage + 1 });
        };
    };

    const onRefresh = () => {
        setRefresh(true);
        setPage({ page: 0 });
        fetchTeam({ page: 0 });
    };

    const onCheck = (id: string) => {
        users.includes(id)
            ? setUsers(state => state.filter(i => i != id))
            : setUsers(state => [...state, id]);
    };
    const emptyCheck = () => (users.length == 0 ? true : false);

    const shareProjects = async () => {
        if (emptyCheck()) {
            showToast('Please select atleast one employee to share project');
        } else {
            try {
                const fnName = 'shareLead';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                formData.append('project_id', project_id);
                formData.append('visible_to', JSON.stringify(users));
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);

                const response = await shareLeads({ token, formData });
                showToast(response.message);
                if (response.success == 1) {
                    setUsers([]);
                    setPage({ page: 0 });
                    fetchTeam({ page: 0 });
                    navigation.navigate('ViewTeam', { details: projectData });
                }
            } catch (error) {
                console.log(error, 'error at shareProjects');
            }
        }
    };

    React.useEffect(() => {
        const delay = search == '' ? 0 : 500;
        const delayDebounceFn = setTimeout(() => {
            setUsers([]);
            setPage({ page: 0 });
            fetchTeam({ page: 0 });
        }, delay);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return {
        teams,
        search,
        onCheck,
        refresh,
        loading,
        btnload,
        teamPage,
        onRefresh,
        setSearch,
        onEndReached,
        shareProjects,
    };
};
export { useShareProjectHook };