import { ToastAndroid } from "react-native";


const showToast = (message: string) => {
    return ToastAndroid.show((message),
        ToastAndroid.SHORT);
};
export default showToast;