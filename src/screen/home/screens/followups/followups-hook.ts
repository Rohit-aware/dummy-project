import React from "react";
import moment from "moment";
import { helpers } from "../../../../utility";
import { getHashString } from "../../../../utility/hashing";
import { useAuthStore, useMyLeadStore, useReloadStore } from "../../../../store";


const useTodaysFollowUpsHook = () => {

    const { getDateString } = helpers;
    const { reload, reloadPage } = useReloadStore();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const {
        getLeads, isFinish, loading, page, setMyLeadPage: setPage, leadsData: followup, setIsFinish
    } = useMyLeadStore();

    const [refresh, setRefresh] = React.useState(false);
    const [showDate, setShowDate] = React.useState(getDateString(new Date().toDateString()));
    const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));


    const fetchFollowups = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getLeads';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );

            const formData = new FormData();
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('page_number', page);
            formData.append('limit', 10);
            formData.append('followup', 'Y');
            formData.append('followup_date', selectedDate);
            getLeads({ token, formData, leadPage: page });
        } catch (e) {
            console.log('Error isnide get FollowUps : ', e);
        }
        setRefresh(false);
    };

    const onDateChange = (newSelectedDate: string, newShowDate: string) => {
        setIsFinish();
        setPage({ leadPage: 0 });
        setShowDate(newShowDate);
        setSelectedDate(newSelectedDate);
        reloadPage();
    };

    const onEndReached = () => {
        if (!isFinish && followup?.length > 0 && !loading) {
            setPage({ leadPage: page + 1 });
            fetchFollowups({ page: page + 1 });
        }
    };
    const onRefresh = () => {
        setIsFinish();
        setPage({ leadPage: 0 });
        fetchFollowups({ page: 0 });
    };

    React.useEffect(() => {
        setPage({ leadPage: 0 });
        fetchFollowups({ page: 0 });
    }, [reload]);


    return {
        showDate,
        onDateChange,
        followup,
        refresh,
        onEndReached,
        onRefresh,
        loading,
        page,
    };
};
export { useTodaysFollowUpsHook };