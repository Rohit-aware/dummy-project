import React from 'react';
import { getHashString } from '../../utility/hashing';
import { useAuthStore, useMyLeadStore, useReloadStore } from '../../store';


const useMyLeadHook = () => {
    const [search, setSearch] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);
    const { reload } = useReloadStore();

    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { getLeads, isFinish, leadsData, page, loading, setMyLeadPage, setIsFinish } = useMyLeadStore();

    const fetchLeads = async ({ page = 0 }: { page?: number }) => {
        try {
            const fnName = 'getLeads';
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
            formData.append('limit', 2);
            formData.append('search_key', search);
            getLeads({ token, formData, leadPage: page })
            setRefresh(false);
        } catch (error: any) {
            console.log("error isnide fetchLead : ", error);
        }
        setRefresh(false);
    };

    const onEndReached = async () => {
        if (!isFinish) {
            setMyLeadPage({ leadPage: page + 1 });
            fetchLeads({ page: page + 1 });
        }
    };

    const onFilter = () => {
        setSearch('');
        // navigation.navigate('FilterMyLeads');
    };

    const onRefresh = () => {
        setRefresh(true);
        setIsFinish({ value: false })
        setMyLeadPage({ leadPage: 0 });
        fetchLeads({});
    };

    React.useEffect(() => {
        setMyLeadPage({ leadPage: 0 });
        fetchLeads({ page: 0 });

        const timeoutId = setTimeout(() => {
            setMyLeadPage({ leadPage: 1 });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [reload]);


    return {
        page,
        search,
        loading,
        refresh,
        isFinish,
        onFilter,
        onRefresh,
        leadsData,
        setSearch,
        onEndReached,
    };
};
export { useMyLeadHook };