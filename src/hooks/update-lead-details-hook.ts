import { getHashString } from '../utility/hashing';
import { useAuthStore, useMyLeadStore } from '../store';



const updateLeadDetail = async ({ client_id }: { client_id: string }) => {

    const { getSingleLeads } = useMyLeadStore.getState();
    const { token, user_detail: userData, deviceId: uuid } = useAuthStore.getState();

    try {

        if (!!token) {
            const fnName = "getLeads";
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName
            );

            const formData = new FormData();
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('client_id', client_id);

            const response = await getSingleLeads({ token, formData });
            if (response.success === '1') {
                return true
            };
        };
        
        return false;
    } catch (error) {
        console.log('Error inside updateLeadDetail details Hook ', error);
        return false;
    };
};

export default updateLeadDetail;