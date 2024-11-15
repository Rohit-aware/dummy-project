


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
    linkedInprefix: "https://www.linkedin.com/in/",
    websiteprefix: "https://",
    httpPrefix: "http",
}

export default helpers;