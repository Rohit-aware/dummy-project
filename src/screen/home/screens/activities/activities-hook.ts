import React from 'react';
import { useAuthStore, useProjectDetailsStore, useReloadStore } from '../../../../store';
import { helpers } from '../../../../utility';
import moment from 'moment';
import { getHashString } from '../../../../utility/hashing';


const useActivitiesHook = () => {
    const { getDateString } = helpers;
    const { reload, reloadPage } = useReloadStore();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const {
        getUpcomingActivities,
        setUpActivityPage,
        upcActivities,
        upcActivityLoad,
        resetIsFinishPage,
        upcActivityPage,
        upcActivityFinsih
    } = useProjectDetailsStore();

    const [refresh, setRefresh] = React.useState(false);
    const [showDate, setShowDate] = React.useState(getDateString(new Date().toDateString()));
    const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));

    const fetchActivities = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getUpcomingActivities';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );

            const formData = new FormData();

            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('activity_date', selectedDate);
            formData.append('page_number', page);
            formData.append('limit', 10);
            getUpcomingActivities({ token, formData, page });
        } catch (e) {
            console.log(e);
        }
    };

    const onRefresh = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false);
            resetIsFinishPage();
            fetchActivities({ page: 0 });
        }, 1000);
    };

    const onEndReached = () => {
        if (!upcActivityFinsih && upcActivities.length > 0 && !upcActivityLoad) {
            setUpActivityPage({ page: upcActivityPage + 1 })
            fetchActivities({ page: upcActivityPage + 1 });
        }
    };

    const onDateChange = (newSelectedDate: string, newShowDate: string) => {
        resetIsFinishPage();
        setShowDate(newShowDate);
        setSelectedDate(newSelectedDate);
        reloadPage()
    };

    React.useEffect(() => {
        fetchActivities({ page: 0 });
    }, [reload]);

    return {
        refresh,
        showDate,
        onRefresh,
        onEndReached,
        onDateChange,
        upcActivities,
        upcActivityLoad,
        upcActivityPage,
    };
};

export { useActivitiesHook };