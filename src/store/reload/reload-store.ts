import { create } from "zustand";



const useReloadStore = create<{ reload: boolean, reloadPage: () => void }>()((set) => ({
    reload: false,
    reloadPage: () => {
        set((state) => ({ reload: !state.reload }))
    }
}));

export default useReloadStore;