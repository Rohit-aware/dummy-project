import { create } from "zustand";
import { AuthStore } from "./interface";
import { endpoints } from "../../services/endpoints";
import { setItem } from "../../local-storage/key-store";
import { createJSONStorage, persist } from "zustand/middleware";
import { networkRequest } from "../../services/network-request";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            loader: false,
            user_detail: {},
            token: '',
            deviceId: '',
            errorMessage: '',

            updateDeviceId: ({ id }) => set({ deviceId: id }),
            clearLoginData: () => {
                set({
                    user_detail: {},
                    token: '',
                })
            },
            processDoLogin: async ({ formData }) => {
                set({ loader: true });
                try {
                    const response = await networkRequest({}).post(endpoints.processLogin, formData);
                    if (response?.data?.success === '1') {
                        set({
                            loader: false,
                            user_detail: response.data.data[0],
                            token: response.data.data[0].token,
                        });
                        await setItem(response.data.data[0].token)
                    } else {
                        set({ loader: false, errorMessage: 'Failed to load dashboard data: Invalid status' });
                    }
                    return response.data;
                } catch (error: any) {
                    set({ loader: false, errorMessage: 'Failed to load dashboard data' });
                }
            },
            updateMyDeviceId: async ({ formData, token }) => {
                try {
                    const response = await networkRequest({ token }).post(endpoints.updateDeviceId, formData);
                    console.log(JSON.stringify(response.data, undefined, 4), 'response.data in auth store ')
                } catch (error: any) {
                    console.log(JSON.stringify(error, undefined, 4), 'error in auth store inside updateMyDeviceId ')

                }
            }
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAuthStore;
