import { create } from "zustand";
import { networkRequest } from "../../services/network-request";
import { endpoints } from "../../services/endpoints";


interface NotesListingProps {
    page: number;
    loading: boolean;
    addNoteLoad: boolean;
    isFinish: boolean;
    notesData: Array<any>;
    setIsFinish: ({ value }: { value: boolean }) => void;
    setNotesPage: ({ notesPage }: { notesPage: number }) => void;
    addNotes: ({ formData, token }: { formData: {}, token: string }) => Promise<any>;
    getNotes: ({ formData, notesPage, token }: { formData: {}, notesPage: number, token: string }) => void;
}

const useNoteListingStore = create<NotesListingProps>()((set) => ({
    page: 0,
    loading: false,
    addNoteLoad: false,
    notesData: [],
    isFinish: false,
    setIsFinish: ({ value }) => {
        set({ isFinish: value })
    },
    setNotesPage: ({ notesPage }) => {
        set({ page: notesPage });
    },
    getNotes: async ({ formData, notesPage, token }) => {
        try {
            set({ loading: true })
            const response = await networkRequest({ token }).post(endpoints.getNotes, formData);
            if (response.data.success === '1') {
                if (notesPage === 0) {
                    set({ notesData: response.data.data });
                } else {
                    set((state) => ({ notesData: [...state.notesData, ...response.data.data] }));
                }
            }
            if (response.data.success === '0' && response.data.data?.length === 0 && response.data.total_record == 0) {
                if (notesPage === 0) {
                    set({ notesData: [] });
                }
                set({ isFinish: true });
            }
            set({ loading: false })
        } catch (error: any) {
            console.log('Error inside useMyLeadStore : ', error)
        }
    },
    addNotes: async ({ formData, token }) => {
        try {
            set({ addNoteLoad: true })
            const response = await networkRequest({ token }).post(endpoints.addNotes, formData);
            set({ addNoteLoad: false })
            return response.data;
        } catch (error: any) {
            console.log('Error inside addNotes : ', error)
        }
    },
}));
export default useNoteListingStore;