import React from "react";
import { getHashString } from "../../utility/hashing";
import { useNavigation } from "@react-navigation/native";
import { IsProjectFilterType } from "../../store/my-project-store/interface";
import { useAuthStore, useCommonStore, useMyProjectStore, useReloadStore } from "../../store";

const useMyProjectHook = () => {
    const navigation = useNavigation<any>();

    const { projects: data, getProjects, page, isFinish, projectLoad, setMyProjectPage, setIsFinish } = useMyProjectStore();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { reload } = useReloadStore();
    const { projectStatus } = useCommonStore();
    const { isProjectFilter } = useMyProjectStore();
    const { client_id, project_status } = useMyProjectStore();

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
        if (!project_status) return '';
        const status = projectStatus.find(e => e.project_status?.toLowerCase() === project_status.toLowerCase());
        return status ? status.id : '';
    };
    const fetchProjects = async ({ page }: { page: number }) => {
        const statusId = getProjectStatus();
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
            if (project_status !== null) {
                !!client_id && formData.append('client_id', client_id);
                !!statusId && formData.append('project_status', statusId);
            } else {
                if (isProjectFilter !== null) {
                    for (let key in isProjectFilter) {
                        formData.append(key, isProjectFilter[key as keyof IsProjectFilterType]);
                    }
                }
            }
            getProjects({ token, formData, projectPage: page });
            setRefresh(false);
        } catch (error) {
            console.log("Error isnide fetchProject : ", error)
        }
    };

    React.useEffect(() => {
        const delay = search == '' ? 0 : 500;
        const debounce = setTimeout(() => {
            setMyProjectPage({ projectPage: 0 });
            fetchProjects({ page: 0 });
        }, delay);

        const timeoutId = setTimeout(() => {
            setMyProjectPage({ projectPage: 1 });
        }, 1000);

        return () => { clearTimeout(timeoutId); clearTimeout(debounce) };
    }, [reload,search]);

    return {
        page,
        data,
        search,
        refresh,
        isFinish,
        onFilter,
        setSearch,
        onRefresh,
        projectLoad,
        onEndReached,
        project_status,
        isProjectFilter,
    };
};
export { useMyProjectHook };