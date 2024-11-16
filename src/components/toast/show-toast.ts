import { ToastAndroid } from "react-native";


const showToast = (message: string, long = false) => {
    return ToastAndroid.show((message),
        long ? ToastAndroid.LONG : ToastAndroid.SHORT);
};
export default showToast;