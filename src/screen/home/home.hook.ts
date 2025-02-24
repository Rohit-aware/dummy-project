import React from "react";
import { getHashString } from "../../utility/hashing";
import { DashboardData } from "../../store/home/interface";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore, useCommonStore, useHomeStore, useActivitiesStore } from "../../store";
interface UseHomeReturnProps {
    refresh: boolean;
    loading: boolean;
    data: DashboardData;
    onRefresh: () => void;
    fetchOutsiders: () => void;
    fetchmaster_data: () => void;
    resetIsFinishPage: () => void;
    fetchHomeData: () => Promise<void>;
    onNavigator: (name: string) => void;
};

const useHome = (): UseHomeReturnProps => {
    const { navigate } = useNavigation<any>();
    const { resetIsFinishPage } = useActivitiesStore();
    const [refresh, setRefresh] = React.useState(false);
    const { getOutsiders, getMasterData } = useCommonStore();
    const { getDashboardData, data, loading } = useHomeStore();
    const { user_detail, deviceId: uuid, token } = useAuthStore();
    const { mkey, msalt } = user_detail;

    const onNavigator = (name: string) => navigate(name);

    const fetchOutsiders = async () => {
        if (token) {
            try {
                const fnName = 'getOutsiders';
                const hash_key = getHashString(
                    user_detail.mkey!,
                    user_detail.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                await getOutsiders({ token, formData });
            } catch (error) { }
        }
    };

    const fetchmaster_data = async () => {
        if (token) {
            try {
                let fnName = 'getMasterData';
                let hash_key = getHashString(
                    user_detail.mkey!,
                    user_detail.msalt!,
                    uuid,
                    fnName,
                );
                const formData = { uuid, hash_key };
                getMasterData({ token, formData });
            } catch (e) { }
        }
    };

    const fetchHomeData = async () => {
        try {
            let fnName = 'dashboard';
            let hash_key = getHashString(mkey!, msalt!, uuid, fnName);
            const formData = new FormData();
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            getDashboardData({ formData, token });
            setRefresh(loading);
        } catch (error: any) {
            console.log(error, ': error isnide the fetchHomeData function')
        };
    };

    const onRefresh = () => {
        setRefresh(true);
        fetchHomeData();
    };

    return {
        data,
        refresh,
        loading,
        onRefresh,
        onNavigator,
        fetchHomeData,
        fetchOutsiders,
        fetchmaster_data,
        resetIsFinishPage,
    };
};

export { useHome };