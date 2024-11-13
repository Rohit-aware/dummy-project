import React from "react";
import { getHashString } from "../../utility/hashing";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore, useCommonStore, useMyProjectStore } from "../../store";

const useMyProjectHook = () => {
    const navigation = useNavigation<any>();

    const { projects: data, getProjects, page, isFinish, projectLoad, setMyProjectPage } = useMyProjectStore();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { projectStatus } = useCommonStore();


    const project_status = data.project_status;
    const client_id = data.client_id;
    const isProjectFilter = data.isProjectFilter;

    const [search, setSearch] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);
    
    const onFilter = () => {
        setSearch('');
        navigation.navigate('FilterMyProjects');
    };

    const onEndReached = () => {
        if (!isFinish) {
            setMyProjectPage({ projectPage: page + 1 });
            fetchProjects({ page: page + 1 });
        }
    };

    const onRefresh = () => {
        setRefresh(true);
        setMyProjectPage({ projectPage: 0 });
        fetchProjects({ page: 0 });
    };

    const getProjectStatus = () => {
        if (!project_status) return ''
        return projectStatus.find(e => e.project_status?.toLowerCase() === project_status?.toLowerCase())['id'];
    };

    const fetchProjects = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getProjects';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );
            const formData = new FormData();
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('page_number', page);
            formData.append('limit', 1);
            search && formData.append('search_key', search);
            if (project_status !== null) {
                client_id !== null && formData.append('client_id', client_id);
                formData.append('project_status', getProjectStatus());
            } else {
                if (isProjectFilter !== '') {
                    for (let key in isProjectFilter) {
                        formData.append(key, isProjectFilter[key]);
                    }
                }
            }
            getProjects({ token, formData, projectPage: page });
        } catch (error) { }
    };


    React.useEffect(() => {
        fetchProjects({ page: 0 });
    }, []);

    React.useEffect(() => {
        setMyProjectPage({ projectPage: 0 });
        fetchProjects({ page: 0 });

        const timeoutId = setTimeout(() => {
            fetchProjects({ page: 1 });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);


    return {
        navigation,
        projectStatus,
        project_status,
        isProjectFilter,
        search,
        data,
        onFilter,
        setSearch,
        page,
        isFinish,
        projectLoad,
        refresh,
        onEndReached,
        onRefresh,
    };
};
export { useMyProjectHook };