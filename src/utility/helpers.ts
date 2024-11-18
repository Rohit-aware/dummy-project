import { Linking, Platform } from "react-native";



const helpers = {
    checkForEmpty: (value: string) => {
        const isEmpty =
            value == null || value == 'undefined' || value == undefined || value == '' || value == "null"
                ? true
                : false;
        return isEmpty;
    },
    isEmpty: (value: string) => {
        const result =
            value == '' || value == null || value == 'undefined' || value == undefined
                ? ''
                : value;
        return result;
    },
    emailCheck: (value: string) => {
        const result =
            value !== '' && !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(value) && value !== undefined
                ? true
                : false;
        return result;
    },
    openCall: ({ phone }: { phone: string }) => {
        let phoneNumber;
        Platform.OS == 'ios' ? phoneNumber = `telprompt:${phone}` : phoneNumber = `tel:${phone}`;
        Linking.openURL(phoneNumber)
            .then(supported => {
                supported ? Linking.openURL(phoneNumber) : console.log('Phone number is not available');
            })
            .catch(err => console.log('Error inside openCall function : ', err));
    },
    linkedInprefix: "https://www.linkedin.com/in/",
    websiteprefix: "https://",
    httpPrefix: "http",
}

export default helpers;