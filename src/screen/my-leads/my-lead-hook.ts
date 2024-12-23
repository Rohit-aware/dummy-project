import React from 'react';
import { getHashString } from '../../utility/hashing';
import { useNavigation } from '@react-navigation/native';
import { IsLeadsFilterType } from '../../store/my-leads/interface';
import { useAuthStore, useMyLeadStore, useReloadStore } from '../../store';


interface UseMyLeadHookReturnTpye {
    page: number;
    search: string;
    loading: boolean;
    refresh: boolean;
    isFinish: boolean;
    onFilter: () => void;
    onRefresh: () => void;
    leadsData: any[];
    onEndReached: () => Promise<void>;
    leadsFilter: Partial<IsLeadsFilterType> | null;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};


const useMyLeadHook = (): UseMyLeadHookReturnTpye => {
    const [search, setSearch] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);

    const { reload } = useReloadStore();
    const { navigate } = useNavigation<any>();

    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { getLeads, isFinish, leadsData, page, loading, setMyLeadPage, setIsFinish, leadsFilter } = useMyLeadStore();

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
            formData.append('limit', 10);
            search && formData.append('search_key', search);
            if (leadsFilter !== null) {
                for (let key in leadsFilter) {
                    formData.append(key, leadsFilter[key as keyof IsLeadsFilterType]);
                }
            };
            getLeads({ token, formData, leadPage: page });
        } catch (error: any) {
            console.log("error isnide fetchLead : ", error);
        }
        setRefresh(false);
    };

    const onEndReached = async () => {
        if (!isFinish && leadsData.length > 0 && !loading) {
            setMyLeadPage({ leadPage: page + 1 });
            fetchLeads({ page: page + 1 });
        }
    };

    const onFilter = () => {
        setSearch('');
        navigate('FilterMyLeads');
    };

    const onRefresh = () => {
        setRefresh(true);
        setIsFinish()
        setMyLeadPage({ leadPage: 0 });
        fetchLeads({});
    };


    React.useEffect(() => {
        const delay = search == '' ? 0 : 500;
        const debounce = setTimeout(() => {
            setMyLeadPage({ leadPage: 0 });
            fetchLeads({ page: 0 });
        }, delay);
        return () => clearTimeout(debounce);
    }, [reload, search]);

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
        leadsFilter,
        onEndReached,
    };
};
export { useMyLeadHook };