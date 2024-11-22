import React from "react";
import { MainStackProps } from "../router/interface";
import { NavigationContainerRef } from "@react-navigation/native";
import useUpdateProjectDetail from "./update-project-details-hooks";
import useUpdateLeadDetails from "./update-lead-details-hook";


const MainStackNavigatorRef = React.createRef<NavigationContainerRef<MainStackProps>>()
export { MainStackNavigatorRef }

const useNavigationFunction = () => {
    const navigate = async (name: string, id: string) => {
        const { updateProjectDetail } = useUpdateProjectDetail();
        const { updateLeadDetail } = useUpdateLeadDetails();

        // Check if navigation ref is available and if the app is in the foreground
        if (MainStackNavigatorRef.current && MainStackNavigatorRef.current.isReady()) {
            let result;
            if (name == "ProjectDetails") {
                result = await updateProjectDetail(id);
                result && MainStackNavigatorRef.current?.navigate('ProjectDetails');
            } else if (name == "LeadDetails") {
                result = await updateLeadDetail(id);
                result && MainStackNavigatorRef.current?.navigate('LeadDetails');
            }
        }
    };
    return {
        navigate
    }

};
export default useNavigationFunction;
