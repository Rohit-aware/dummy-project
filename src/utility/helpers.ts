


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
    }
}

export default helpers;