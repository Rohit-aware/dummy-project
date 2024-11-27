import { getHashString } from '../utility/hashing';
import { useAuthStore, useMyProjectStore } from '../store';

const updateProjectDetail = async ({ project_id }: { project_id: string }) => {

    const { token, user_detail: userData, deviceId: uuid } = useAuthStore.getState();
    const { getSingleProject } = useMyProjectStore.getState();

    try {

        if (token !== undefined) {
            const fnName = "getProjects";
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName
            );

            const formData = new FormData();
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('client_id', project_id);

            const response = await getSingleProject({ token: token, formData });
            if (response.success == 1) {
                return true;
            };
        };

        return false;
    } catch (error) {
        console.log('Error inside updateProject details Hook ', error);
        return false;
    }
};
export default updateProjectDetail;