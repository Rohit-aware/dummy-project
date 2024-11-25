import { helpers } from "../utility";
import useUpdateLeadDetails from "./update-lead-details-hook";
import { MainStackNavigatorRef } from "./mainstack-navigation-ref";
import useUpdateProjectDetail from "./update-project-details-hooks";
import { useAuthStore, useMyLeadStore, useMyProjectStore, useProjectDetailsStore } from "../store";

const useNavigateHelper = () => {
    const { getSingleLeads } = useMyLeadStore();
    const { updateLeadDetail } = useUpdateLeadDetails();
    const { resetIsFinishPage } = useProjectDetailsStore();
    const { token, user_detail, deviceId } = useAuthStore();
    const { updateProjectDetail } = useUpdateProjectDetail();
    const { getSingleProject, setProjectDetail } = useMyProjectStore();

    const navigate = async (name: string, id: string) => {
        if (MainStackNavigatorRef.current && MainStackNavigatorRef.current.isReady()) {
            let result;
            if (name === "ProjectDetails") {
                result = await updateProjectDetail(id, token, user_detail, deviceId, getSingleProject, setProjectDetail);
                result && (
                    resetIsFinishPage(),
                    helpers.navigateThroughFCM('ProjectDetails')
                )
            } else if (name === "LeadDetails") {
                result = await updateLeadDetail(id, token, user_detail, deviceId, getSingleLeads);
                result && helpers.navigateThroughFCM('LeadDetails');
            }
        }
    };

    return { navigate };
};

export default useNavigateHelper;