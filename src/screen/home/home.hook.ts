import { useAuthStore, useHomeStore } from "../../store";
import { getHashString } from "../../utility/hashing";

const useHome = () => {
    const { getDashboardData, data, loading } = useHomeStore();
    const { user_detail, deviceId: uuid, token } = useAuthStore();
    const { mkey, msalt } = user_detail;

    const onNavigator = (name: string) => {

    }

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
    }
}

export { useHome }