import { useAuthStore, useMyProjectStore } from "../store";
import { getHashString } from '../utility/hashing';

const useUpdateProjectDetail = () => {
    const { token, user_detail, deviceId } = useAuthStore();
    const { getSingleProject, setProjectDetail } = useMyProjectStore();

    const updateProjectDetail = async (project_id: string | number) => {
        try {
            let userData = user_detail;
            let uuid = deviceId;

            if (token !== undefined) {
                let fnName = "getProjects";
                let hash_key = getHashString(userData?.mkey!, userData?.msalt!, uuid!, fnName);
                let formData = { uuid, hash_key, project_id };

                const response = await getSingleProject({ token: token, formData });
                if (response.success == 1) {
                    setProjectDetail({ data: { ...response.data[0] } });
                    return true;
                }
            }
        } catch (error) {
            console.log('Error inside updateProject details Hook ', error);
            return false;
        }
    };

    return { updateProjectDetail };
};
export default useUpdateProjectDetail;
