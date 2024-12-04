import React from "react";
import { helpers } from "../../utility";
import { showToast } from "../../components";
import { getHashString } from "../../utility/hashing";
import { useNavigation } from "@react-navigation/native";
import { useAddLeadStore, useAuthStore, useCommonStore } from "../../store";
import { InputFields, UseAddLeadHookReturnType, ValidationRule } from "./interface";


const useAddLeadHook = (): UseAddLeadHookReturnType => {
    const { navigate } = useNavigation<any>();
    const { createlead } = useAddLeadStore();
    const { token, deviceId: uuid, user_detail: userData } = useAuthStore();
    const { linkedInprefix, websiteprefix, httpPrefix, checkForEmpty, emailCheck } = helpers;
    const { outsiderData, cityData, stateData, sources, stateLoad, cityLoad, getCity } = useCommonStore();

    const [countryModal, setCountryModal] = React.useState<boolean>(false);
    const [inputs, setInputs] = React.useState<InputFields>({
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
    }, [inputs]);

    const removePrefix = React.useCallback(({ name }: { name: string }) => {
        if (name === 'linkedIn' && (inputs.linkedIn === '' || inputs.linkedIn === linkedInprefix)) {
            setInputs(prevInputs => ({ ...prevInputs, linkedIn: '' }));
        }
        if (name === 'website_url' && (inputs.website_url === '' || !inputs.website_url.includes(httpPrefix))) {
            setInputs(prevInputs => ({ ...prevInputs, website_url: '' }));
        }
    }, [inputs]);

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

    const onSelectCountry = (country: { callingCode: string, name: string }) => {
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
        const validationRules: ValidationRule[] = [
            { field: 'company_name', message: 'Please enter company name' },
            { field: 'contact_name', message: 'Please enter contact name' },
            { field: 'countryname', message: 'Please select any country' },
            { field: 'contact_number', message: 'Please enter your mobile number' },
            { field: 'emailId', message: 'Please enter valid email id', condition: (val) => emailCheck(val) },
            { field: 'source', message: 'Please select any source' },
        ];

        for (const { field, message, condition = checkForEmpty } of validationRules) {
            if (condition(inputs[field])) {
                showToast(message);
                return;
            }
        }

        try {
            const fnName = 'createLead';
            const hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
            const formData = new FormData();

            const fields: Array<{ field: keyof InputFields, target?: string, condition?: (val: string) => boolean }> = [
                { field: "company_name" },
                { field: "contact_name", target: 'contact_person' },
                { field: "contact_number", target: 'phone' },
                { field: "emailId", target: 'email', condition: (val: string) => !emailCheck(val) },
                { field: "designation", target: 'person_role' },
                { field: "skype" },
                { field: "source" },
                { field: "requirement", target: 'remark' },
                { field: "outsider_id", condition: (val: any) => inputs.source === 'outsider' && val },
                { field: "linkedIn", target: 'linkedin_url' },
                { field: "website_url" },
                { field: "countrycode", target: 'country_id' },
                { field: "countryname", target: 'country_name' },
            ];


            fields.forEach(({ field, target = field, condition = checkForEmpty }) => {
                if (!condition(inputs[field])) {
                    formData.append(target, inputs[field]);
                }
            });

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
