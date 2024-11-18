import React from "react";
import { getHashString } from "../../utility/hashing";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore, useCommonStore, useMyProjectStore, useReloadStore } from "../../store";

const useMyProjectHook = () => {
    const navigation = useNavigation<any>();

    const { projects: data, getProjects, page, isFinish, projectLoad, setMyProjectPage, setIsFinish } = useMyProjectStore();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { projectStatus } = useCommonStore();
    const { reload } = useReloadStore();

    const project_status: any = '';
    const client_id = '';
    const isProjectFilter: any = '';

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
        setIsFinish()
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
            formData.append('limit', 10);
            search && formData.append('search_key', search);
            if (!!project_status) {
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
            setRefresh(false);
        } catch (error) {
            console.log("Error isnide fetchProject : ", error)
        }
    };


    return {
        page,
        data,
        search,
        reload,
        refresh,
        isFinish,
        onFilter,
        setSearch,
        onRefresh,
        projectLoad,
        onEndReached,
        fetchProjects,
        project_status,
        isProjectFilter,
        setMyProjectPage,
    };
};
export { useMyProjectHook };