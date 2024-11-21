import { getHashString } from '../utility/hashing';
import { useAuthStore, useMyLeadStore } from "../store";

const useUpdateLeadDetails = () => {


    const updateLeadDetail = async (client_id: string | number) => {
        try {
            const storeData = useAuthStore();
            const { getSingleLeads } = useMyLeadStore();
            let userData;
            let uuid;
            if (storeData.user_detail.token !== undefined) {
                userData = storeData.user_detail;
                uuid = storeData.deviceId;

                let fnName = "getLeads";
                let hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
                let formData;
                formData = { uuid, hash_key, client_id }

                const response = await getSingleLeads({ token: storeData.token, formData });
                if (response.success === '1') {
                    return true
                }
            }
        } catch (error) {
            return false
        }
    };

    return {
        updateLeadDetail,
    }
}

export default useUpdateLeadDetails;