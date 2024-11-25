import { getHashString } from '../utility/hashing';

const useUpdateProjectDetail = () => {
    const updateProjectDetail = async (project_id: string | number, token: string, user_detail: any, deviceId: string, getSingleProject: Function, setProjectDetail: Function) => {
        try {
            let uuid = deviceId;
            if (token !== undefined) {
                let fnName = "getProjects";
                let hash_key = getHashString(user_detail?.mkey!, user_detail?.msalt!, uuid!, fnName);
                let formData = { uuid, hash_key, project_id };

                const response = await getSingleProject({ token: token, formData });
                if (response.success == 1) {
                    setProjectDetail({ data: { ...response.data[0] } });
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log('Error inside updateProject details Hook ', error);
            return false;
        }
    };

    return { updateProjectDetail };
};
export default useUpdateProjectDetail;
