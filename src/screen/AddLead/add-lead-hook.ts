import React from "react";
import { getHashString } from "../../utility/hashing";
import { UseAddLeadHookReturnType } from "./interface";
import { useNavigation } from "@react-navigation/native";
import { useAddLeadStore, useAuthStore, useCommonStore } from "../../store";

const Prefix = {
    linkedInprefix: "https://www.linkedin.com/in/",
    websiteprefix: "https://",
    httpPrefix: "http",
}

const useAddLeadHook = (): UseAddLeadHookReturnType => {
    const { navigate } = useNavigation<any>();
    const { createlead } = useAddLeadStore();
    const { outsiderData, cityData, stateData, sources, stateLoad, cityLoad, getCity } = useCommonStore();
    const { token, deviceId: uuid, user_detail: userData } = useAuthStore();

    const checkForEmpty = (value: string) => {
        const isEmpty =
            value == null || value == 'undefined' || value == undefined || value == '' || value == "null"
                ? true
                : false;

        return isEmpty;
    };

    const emailCheck = (value: string) => {
        const result =
            value !== '' && !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(value) && value !== undefined
                ? true
                : false;
        return result;
    };

    const [countryModal, setcountryModal] = React.useState(false);
    const [inputs, setInputs] = React.useState({
        company_name: '',
        contact_name: '',
        contact_number: '',
        emailId: '',
        linkedIn: '',
        website_url: '',
        address: '',
        state_id: '',
        city_id: '',
        state_name: '',
        city_name: '',
        source: '',
        designation: '',
        skype: '',
        requirement: '',
        outsider_name: '',
        outsider_id: '',
        countrycode: '91',
        countryname: 'India',
    });
    const onChangeText = (name: string, value: any) => {
        setInputs({ ...inputs, [name]: value });
    };

    const addPrefix = ({ name }: { name: string }) => {
        if (name == 'linkedIn') {
            if (
                inputs.linkedIn == Prefix.linkedInprefix ||
                inputs.linkedIn == '' ||
                !inputs.linkedIn.includes(Prefix.linkedInprefix)
            ) {
                setInputs({ ...inputs, linkedIn: Prefix.linkedInprefix });
            }
        }
        if (name == 'website_url') {
            if (
                inputs.website_url == Prefix.websiteprefix ||
                inputs.website_url == '' ||
                !inputs.website_url.includes(Prefix.httpPrefix)
            ) {
                setInputs({ ...inputs, website_url: Prefix.websiteprefix });
            }
        }
    };

    const removePrefix = ({ name }: { name: string }) => {
        if (name == 'linkedIn') {
            if (inputs.linkedIn == '' || inputs.linkedIn == Prefix.linkedInprefix) {
                setInputs({ ...inputs, linkedIn: '' });
            }
        }
        if (name == 'website_url') {
            if (
                inputs.website_url == Prefix.websiteprefix ||
                inputs.website_url == '' ||
                !inputs.website_url.includes(Prefix.httpPrefix)
            ) {
                setInputs({ ...inputs, website_url: '' });
            }
        }
    };
    const onSelect = (name: string, data: any) => {
        name == 'state_name'
            ?
            setInputs({
                ...inputs,
                state_id: data['state_id'],
                state_name: data['state_name'],
                city_id: '',
                city_name: '',
            })

            : name == 'city_name'
                ? setInputs({
                    ...inputs,
                    city_id: data['city_id'],
                    city_name: data['city_name'],
                })
                : name == 'outsider_name'
                    ? setInputs({
                        ...inputs,
                        outsider_name: data['nickname'],
                        outsider_id: data['id'],
                    })
                    : setInputs({
                        ...inputs,
                        [name]: data,
                    });
    };

    const onSelectCountry = (country: any) => {
        const { callingCode, name } = country;
        setInputs({
            ...inputs,
            countrycode: callingCode.toString(),
            countryname: name,
        });
    };

    const openCountryModal = () => setcountryModal(true);
    const closeCountryModal = () => setcountryModal(false);

    const fetchCities = async () => {
        if (inputs.state_id !== '0' && inputs.state_id !== '') {
            try {
                const formData = new FormData();
                formData.append('state_id', inputs.state_id);
                getCity({ token, formData });
            } catch (error) { }
        }
    };

    React.useEffect(() => {
        fetchCities();
    }, [inputs.state_id]);

    const addLead = async () => {
        try {
            const fnName = 'createLead';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );
            const formData = new FormData();
            formData.append('company_name', inputs.company_name);
            formData.append('contact_person', inputs.contact_name);
            formData.append('phone', inputs.contact_number);
            !emailCheck(inputs.emailId) && formData.append('email', inputs.emailId);
            !checkForEmpty(inputs.designation) &&
                formData.append('person_role', inputs.designation);
            !checkForEmpty(inputs.skype) && formData.append('skype', inputs.skype);
            !checkForEmpty(inputs.source) &&
                formData.append('source', inputs.source);
            !checkForEmpty(inputs.designation) &&
                formData.append('person_role', inputs.designation);
            !checkForEmpty(inputs.designation) &&
                formData.append('skype', inputs.skype);
            !checkForEmpty(inputs.requirement) &&
                formData.append('remark', inputs.requirement);
            (inputs.source == 'outsider' && inputs.outsider_id !== '') &&
                formData.append('outsider_id', inputs.outsider_id);
            !checkForEmpty(inputs.linkedIn) &&
                formData.append('linkedin_url', inputs.linkedIn);
            !checkForEmpty(inputs.website_url) &&
                formData.append('website_url', inputs.website_url);
            !checkForEmpty(inputs.countrycode) &&
                formData.append('country_id', inputs.countrycode);
            !checkForEmpty(inputs.countryname) &&
                formData.append('country_name', inputs.countryname);
            if (inputs.countrycode == '91') {
                formData.append('state_id', inputs.state_id);
                formData.append('city_id', inputs.city_id);
                formData.append('address', inputs.address);
            } else {
                formData.append('state_id', '');
                formData.append('city_id', '');
                formData.append('address', '');
            }
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            const response = await createlead({ token, formData });
            if (response.success == '1') {
                navigate('MyLeads');
            }
        } catch (error: any) {
            console.log("Error while adding leand  : ", error);
        }
    }


    return {
        inputs,
        addLead,
        sources,
        cityLoad,
        cityData,
        onSelect,
        stateLoad,
        addPrefix,
        stateData,
        outsiderData,
        countryModal,
        onChangeText,
        removePrefix,
        onSelectCountry,
        openCountryModal,
        closeCountryModal,
    }
};
export { useAddLeadHook };