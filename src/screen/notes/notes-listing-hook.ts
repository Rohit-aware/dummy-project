
import React from 'react';
import { showToast } from '../../components';
import { getHashString } from '../../utility/hashing';
import { useAuthStore, useMyLeadStore, useNoteListingStore, useReloadStore } from '../../store';

const useNotesListingHook = () => {

    const { reload } = useReloadStore();
    const { leadDetails: { client_id } } = useMyLeadStore();
    const { getNotes, isFinish, loading, notesData, page, setNotesPage } = useNoteListingStore();
    const { user_detail: { mkey, msalt }, token, deviceId: uuid } = useAuthStore();

    const [refresh, setRefresh] = React.useState(false);

    const fetchNotes = async ({ page }: { page: number }) => {
        try {
            const fnName = 'getNotes';
            const hash_key = getHashString(mkey!, msalt!, uuid, fnName);
            const formData = new FormData();
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('client_id', client_id);
            formData.append('page_number', page);
            formData.append('limit', 10);
            getNotes({ token, formData, notesPage: page });
        } catch (error) {
            console.log(error, 'error at fetchNoted');
            showToast('network error');
        }
        setRefresh(false);
    };

    const onEndReached = () => {
        if (!isFinish) {
            setNotesPage({ notesPage: page + 1 });
            fetchNotes({ page: page + 1 });
        }
    };

    const onRefresh = () => {
        setRefresh(true);
        setNotesPage({ notesPage: 0 });
        fetchNotes({ page: 0 });
    };

    React.useEffect(() => {
        setNotesPage({ notesPage: 0 });
        fetchNotes({ page: 0 });

        const timeOut = setTimeout(() => {
            setNotesPage({ notesPage: 1 });
        }, 1000);
        return () => clearTimeout(timeOut);
    }, [reload]);



    return {
        page,
        loading,
        refresh,
        isFinish,
        notesData,
        onRefresh,
        onEndReached,
    };
};
export { useNotesListingHook };