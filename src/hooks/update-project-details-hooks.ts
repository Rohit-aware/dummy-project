import { useAuthStore, useMyProjectStore } from "../store";
import { getHashString } from '../utility/hashing';

const updateProjectDetail = async (project_id: string | number) => {

    try {
        const storeData = useAuthStore();
        const { getSingleProject, setProjectDetail } = useMyProjectStore();
        let userData;
        let uuid;
        if (storeData.user_detail.token !== undefined) {
            userData = storeData.user_detail;
            uuid = storeData.deviceId;

            let fnName = "getProjects";
            let hash_key = getHashString(userData?.mkey!, userData?.msalt!, uuid!, fnName);
            let formData;
            formData = { uuid, hash_key, project_id: project_id, }

            const response = await getSingleProject({ token: storeData?.token, formData, });
            if (response.success == 1) {
                setProjectDetail(response.data[0]);
                return true
            }
        }
    } catch (error) {
        return false
    }
}
export default updateProjectDetail;