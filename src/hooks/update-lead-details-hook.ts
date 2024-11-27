import { useAuthStore, useMyLeadStore } from '../store';
import { getHashString } from '../utility/hashing';



const updateLeadDetail = async ({ client_id }: { client_id: string }) => {
    const { getSingleLeads } = useMyLeadStore.getState();
    const { token, user_detail: userData, deviceId } = useAuthStore.getState();
    try {
        let uuid = deviceId;
        if (token !== undefined) {
            let fnName = "getLeads";
            let hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
            let formData;
            formData = { uuid, hash_key, client_id }

            const response = await getSingleLeads({ token, formData });
            if (response.success === '1') {
                return true
            }
        }
    } catch (error) {
        return false
    }
};

export default updateLeadDetail;