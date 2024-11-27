import { useAuthStore, useMyProjectStore } from '../store';
import { getHashString } from '../utility/hashing';

const updateProjectDetail = async ({ project_id }: { project_id: string }) => {
    const { token, user_detail: userData, deviceId: uuid } = useAuthStore.getState();
    const { getSingleProject } = useMyProjectStore.getState();

    try {
        if (token !== undefined) {
            let fnName = "getProjects";
            let hash_key = getHashString(userData?.mkey!, userData?.msalt!, uuid!, fnName);
            let formData = { uuid, hash_key, project_id };

            const response = await getSingleProject({ token: token, formData });
            if (response.success == 1) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log('Error inside updateProject details Hook ', error);
        return false;
    }
};
export default updateProjectDetail;
