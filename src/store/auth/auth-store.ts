import { create } from "zustand";
import { AuthStore } from "./interface";
import { endpoints } from "../../services/endpoints";
import { createJSONStorage, persist } from "zustand/middleware";
import { networkRequest } from "../../services/network-request";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            loader: false,
            forgotLoad: false,
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
                    } else {
                        set({ loader: false, errorMessage: 'Failed to load dashboard data: Invalid status' });
                    }
                    return response.data;
                } catch (error: any) {
                    set({ loader: false, errorMessage: 'Failed to load dashboard data' });
                }
                set({ loader: false });
            },
            requestOtp: async ({ formData }) => {
                set({ forgotLoad: true });
                try {
                    const response = await networkRequest({}).post(endpoints.requestOtp, formData);
                    return response.data;
                } catch (error: any) {
                    set({ loader: false, errorMessage: 'Failed to load dashboard data' });
                }
                set({ forgotLoad: false });
            },
            updateMyDeviceId: async ({ formData, token }) => {
                try {
                    await networkRequest({ token }).post(endpoints.updateDeviceId, formData);
                } catch (error: any) {
                    console.log(error, 'error in auth store inside updateMyDeviceId ')

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
