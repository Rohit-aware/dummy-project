import React from "react";
import { useAuthStore, useReloadStore, useRemindersStore } from "../../../../store";
import { helpers } from "../../../../utility";
import { getHashString } from "../../../../utility/hashing";
import moment from "moment";

const useRemindersHook = () => {
    const { getDateString } = helpers;
    const { reload, reloadPage } = useReloadStore();
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const {
        getReminders, isFinish, loading, page, setPage, reminders, resetPageIsFinish
    } = useRemindersStore();

    const [refresh, setRefresh] = React.useState(false);
    const [showDate, setShowDate] = React.useState(getDateString(new Date().toDateString()));
    const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'),);

    const fetchReminders = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getReminders';
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
            formData.append('reminder_date', selectedDate);
            formData.append('uuid', uuid);
            getReminders({ token, formData, page })
        } catch (e) {
            console.log(e);
        }
        setRefresh(false);
    };

    const onDateChange = (newSelectedDate: string, newShowDate: string) => {
        resetPageIsFinish();
        setShowDate(newShowDate);
        setSelectedDate(newSelectedDate);
        reloadPage();
    };

    const onEndReached = () => {
        if (!isFinish && reminders.length > 0 && !loading) {
            setPage({ page: page + 1 });
            fetchReminders({ page: page + 1 });
        }
    };
    const onRefresh = () => {
        resetPageIsFinish();
        fetchReminders({ page: 0 });
    };

    React.useEffect(() => {
        fetchReminders({ page: 0 });
    }, [reload]);

    return {
        page,
        loading,
        refresh,
        showDate,
        reminders,
        onRefresh,
        onDateChange,
        onEndReached,
    };
}

export { useRemindersHook }