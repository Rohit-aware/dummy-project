import React from "react";
import { getHashString } from "../../utility/hashing";
import { useAuthStore, useProfileStore } from "../../store";

const useProfileHook = () => {
    const { getPersonalDetails, loading: profileLoad, getWorkOverview } = useProfileStore();
    const { user_detail: userData, token, deviceId: uuid } = useAuthStore();
    const [loading, setLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [isVisible, setVisible] = React.useState(false);
    const [active, setActive] = React.useState('Personal Details');
    const [year, setYear] = React.useState(new Date().getFullYear().toString());

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const changeYear = (data: any) => {
        setYear(data);
        setVisible(false);
    };

    const onRefresh = () => {
        setRefresh(true);
        const timeoute = setTimeout(() => {
            setRefresh(false);
            getProfileDetails();
            fetchWorkoverview();
        }, 1000);
        return clearTimeout(timeoute)
    };

    const fetchWorkoverview = async () => {
        try {
            const fnName = 'getWorkOverview';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );
            const formData = new FormData();
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('year', year);
            getWorkOverview({ token, formData });
        } catch (error) {
            console.log(error, 'error at fetchWorkoverview');
        }
        setRefresh(false);
    }

    const getProfileDetails = async () => {
        const fnName = 'getPersonalDetails';
        const hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
        const formData = { uuid, hash_key };
        getPersonalDetails({ token, formData });
        setRefresh(false);
    };

    React.useEffect(() => {
        fetchWorkoverview();
    }, []);

    return {
        year,
        open,
        close,
        active,
        loading,
        refresh,
        isVisible,
        onRefresh,
        setActive,
        changeYear,
        setRefresh,
        profileLoad,
    }
};
export { useProfileHook };