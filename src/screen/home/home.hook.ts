import { getHashString } from "../../utility/hashing";
import { useAuthStore, useCommonStore, useHomeStore } from "../../store";
import { DashboardData } from "../../store/home/interface";
interface UseHomeReturnProps {
    data: DashboardData;
    loading: boolean;
    onNavigator: (name: string) => void;
    fetchHomeData: () => Promise<void>;
    fetchOutsiders: () => void;
    fetchmaster_data: () => void;
}

const useHome = (): UseHomeReturnProps => {
    const { getDashboardData, data, loading } = useHomeStore();
    const { user_detail, deviceId: uuid, token } = useAuthStore();
    const { getStates, getOutsiders, getMasterData } = useCommonStore();
    const { mkey, msalt } = user_detail;

    const onNavigator = (name: string) => {

    };

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
            getDashboardData({ formData, token })
        } catch (error: any) {
            console.log(error, ': error isnide the fetchHomeData function')
        }
    };

    return {
        data,
        loading,
        onNavigator,
        fetchHomeData,
        fetchOutsiders,
        fetchmaster_data,
    }
}

export { useHome };