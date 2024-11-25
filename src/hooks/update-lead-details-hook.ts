import { getHashString } from '../utility/hashing';

const useUpdateLeadDetails = () => {


    const updateLeadDetail = async (client_id: string | number, token: string, userData: any, deviceId: string, getSingleLeads: Function) => {
        try {
            let uuid = deviceId;
            if (token !== undefined) {
                let fnName = "getLeads";
                let hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
                let formData;
                formData = { uuid, hash_key, client_id }

                const response = await getSingleLeads({ token: userData.token, formData });
                if (response.success === '1') {
                    return true
                }
            }
        } catch (error) {
            return false
        }
    };

    return {
        updateLeadDetail
    }
}

export default useUpdateLeadDetails;