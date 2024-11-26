import React from "react";
import { helpers } from "../../utility";
import { showToast } from "../../components";
import { getHashString } from "../../utility/hashing";
import { UseAddLeadHookReturnType } from "./interface";
import { useNavigation } from "@react-navigation/native";
import { useAddLeadStore, useAuthStore, useCommonStore } from "../../store";

const useAddLeadHook = (): UseAddLeadHookReturnType => {
    const { navigate } = useNavigation<any>();
    const { createlead } = useAddLeadStore();
    const { outsiderData, cityData, stateData, sources, stateLoad, cityLoad, getCity } = useCommonStore();
    const { token, deviceId: uuid, user_detail: userData } = useAuthStore();
    const { linkedInprefix, websiteprefix, httpPrefix, checkForEmpty, emailCheck } = helpers;

    const [countryModal, setCountryModal] = React.useState(false);
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
        state_name: 'India',
        city_name: '',
        source: '',
        designation: '',
        skype: '',
        requirement: '',
        outsider_name: '',
        outsider_id: '',
        countrycode: '91',
        countryname: '',
    });

    const onChangeText = React.useCallback((name: string, value: string) => {
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }, []);

    const addPrefix = React.useCallback(({ name }: { name: string }) => {
        if (name === 'linkedIn' && (inputs.linkedIn === '' || !inputs.linkedIn.includes(linkedInprefix))) {
            setInputs(prevInputs => ({ ...prevInputs, linkedIn: linkedInprefix }));
        }
        if (name === 'website_url' && (inputs.website_url === '' || !inputs.website_url.includes(httpPrefix))) {
            setInputs(prevInputs => ({ ...prevInputs, website_url: websiteprefix }));
        }
    }, [inputs, linkedInprefix, websiteprefix, httpPrefix]);

    const removePrefix = React.useCallback(({ name }: { name: string }) => {
        if (name === 'linkedIn' && (inputs.linkedIn === '' || inputs.linkedIn === linkedInprefix)) {
            setInputs(prevInputs => ({ ...prevInputs, linkedIn: '' }));
        }
        if (name === 'website_url' && (inputs.website_url === '' || !inputs.website_url.includes(httpPrefix))) {
            setInputs(prevInputs => ({ ...prevInputs, website_url: '' }));
        }
    }, [inputs, linkedInprefix, httpPrefix]);

    const onSelect = React.useCallback((name: string, data: any) => {
        const updatedInputs = { ...inputs, [name]: data };
        if (name == 'state_name') {
            updatedInputs.state_id = data?.['state_id'];
            updatedInputs.state_name = data?.['state_name'];
            updatedInputs.city_id = '';
            updatedInputs.city_name = '';
        } else if (name == 'city_name') {
            updatedInputs.city_id = data?.['city_id'];
            updatedInputs.city_name = data?.['city_name'];
        } else if (name == 'outsider_name') {
            updatedInputs.outsider_name = data?.['nickname'];
            updatedInputs.outsider_id = data?.['id'];
        }
        setInputs(updatedInputs);
    }, [inputs]);


    const onSelectCountry = (country: any) => {
        const { callingCode, name } = country;
        setInputs(prevInputs => ({
            ...prevInputs,
            countrycode: callingCode.toString(),
            countryname: name,
        }));
    };

    const openCountryModal = () => setCountryModal(true);
    const closeCountryModal = () => setCountryModal(false);

    const fetchCities = React.useCallback(async () => {
        if (inputs.state_id && inputs.state_id !== '0') {
            try {
                const formData = new FormData();
                formData.append('state_id', inputs.state_id);
                getCity({ token, formData });
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        }
    }, [inputs.state_id, token, getCity]);

    React.useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    const addLead = async () => {
        const validationErrors = [
            { condition: checkForEmpty(inputs.company_name), message: 'Please enter company name' },
            { condition: checkForEmpty(inputs.contact_name), message: 'Please enter contact name' },
            { condition: checkForEmpty(inputs.countryname), message: 'Please select any country' },
            { condition: checkForEmpty(inputs.contact_number), message: 'Please enter your mobile number' },
            { condition: emailCheck(inputs.emailId), message: 'Please enter valid email id' },
            { condition: checkForEmpty(inputs.source), message: 'Please select any source' },
        ];

        for (const error of validationErrors) {
            const { condition, message } = error;
            if (condition) {
                showToast(message);
                return;
            };
        };

        try {
            const fnName = 'createLead';
            const hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
            const formData = new FormData();

            formData.append('company_name', inputs.company_name);
            formData.append('contact_person', inputs.contact_name);
            formData.append('phone', inputs.contact_number);
            if (!emailCheck(inputs.emailId)) formData.append('email', inputs.emailId);
            if (!checkForEmpty(inputs.designation)) formData.append('person_role', inputs.designation);
            if (!checkForEmpty(inputs.skype)) formData.append('skype', inputs.skype);
            if (!checkForEmpty(inputs.source)) formData.append('source', inputs.source);
            if (!checkForEmpty(inputs.requirement)) formData.append('remark', inputs.requirement);
            if (inputs.source === 'outsider' && inputs.outsider_id) formData.append('outsider_id', inputs.outsider_id);
            if (!checkForEmpty(inputs.linkedIn)) formData.append('linkedin_url', inputs.linkedIn);
            if (!checkForEmpty(inputs.website_url)) formData.append('website_url', inputs.website_url);
            if (!checkForEmpty(inputs.countrycode)) formData.append('country_id', inputs.countrycode);
            if (!checkForEmpty(inputs.countryname)) formData.append('country_name', inputs.countryname);

            if (inputs.countrycode === '91') {
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
            if (response.success === '1') {
                navigate('MyLeads');
            }
        } catch (error) {
            console.error("Error while adding lead:", error);
        }
    };

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
    };
};

export { useAddLeadHook };