import React from "react";
import { helpers } from "../../utility";
import { showToast } from "../../components";
import { getHashString } from "../../utility/hashing";
import { useNavigation } from "@react-navigation/native";
import { useAddLeadStore, useAuthStore, useCommonStore, useMyLeadStore, useReloadStore } from "../../store";

const useEditLeadHook = () => {
    const { navigate } = useNavigation<any>();

    const { token, deviceId: uuid, user_detail: userData } = useAuthStore();

    const [loading, setLoading] = React.useState(false);
    const [countryModal, setcountryModal] = React.useState(false);

    const { leadDetails: leadDetail } = useMyLeadStore();
    const { updateLead } = useAddLeadStore();
    const { reloadPage } = useReloadStore();
    const { is_owner } = leadDetail
    const { linkedInprefix, websiteprefix, httpPrefix, checkForEmpty, emailCheck, } = helpers;
    const { sources, stateData: states, cityData: city, cityLoad, outsiderData: outsiders, getCity, stateLoad } = useCommonStore();

    const [inputs, setInputs] = React.useState({
        company_name: leadDetail['company_name'],
        contact_name: leadDetail['contact_person'],
        contact_number: leadDetail['phone'],
        emailId: leadDetail['email'],
        linkedIn: leadDetail['linkedin_url'],
        website_url: leadDetail['website_url'],
        address: leadDetail['address'],
        state_id: leadDetail['state_id'],
        city_id: leadDetail['city_id'],
        state_name: leadDetail['state_name'],
        city_name: leadDetail['city_name'],
        source: leadDetail['source'],
        designation: leadDetail['person_role'],
        skype: leadDetail['skype'],
        requirement: leadDetail['remark'],
        outsider_name: leadDetail['outsider_name'],
        outsider_id: leadDetail['outsider_id'],
        countrycode: leadDetail['country_id'],
        countryname: leadDetail['country_name'],
    });
    const onChangeText = (name: string, value: any) => {
        setInputs({ ...inputs, [name]: value });
    };

    const addPrefix = ({ name }: { name: string }) => {
        if (name == 'linkedIn') {
            if (
                inputs.linkedIn == linkedInprefix ||
                inputs.linkedIn == '' ||
                !inputs.linkedIn.includes(linkedInprefix)
            ) {
                setInputs({ ...inputs, linkedIn: linkedInprefix });
            }
        }
        if (name == 'website_url') {
            if (
                inputs.website_url == websiteprefix ||
                inputs.website_url == '' ||
                !inputs.website_url.includes(httpPrefix)
            ) {
                setInputs({ ...inputs, website_url: websiteprefix });
            }
        }
    };

    const removePrefix = ({ name }: { name: string }) => {
        if (name == 'linkedIn') {
            if (inputs.linkedIn == '' || inputs.linkedIn == linkedInprefix) {
                setInputs({ ...inputs, linkedIn: '' });
            }
        }
        if (name == 'website_url') {
            if (
                inputs.website_url == websiteprefix ||
                inputs.website_url == '' ||
                !inputs.website_url.includes(httpPrefix)
            ) {
                setInputs({ ...inputs, website_url: '' });
            }
        }
    };

    const fetchCities = React.useCallback(async () => {
        if (inputs.state_id !== '0' && inputs.state_id !== '') {
            try {
                const formData = new FormData();
                formData.append('state_id', inputs.state_id);
                const response = await getCity({ token, formData });
            } catch (error) {
                console.log(error);
            }
        }
    }, [inputs.state_id]);

    const onSelect = (name: string, data: any) => {
        name == 'state_name'
            ? setInputs({
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

    const editableCheck = () => (is_owner == 'Y' ? true : false);
    const disabledCheck = () => (is_owner == 'Y' ? false : true);

    const openCountryModal = () => setcountryModal(true);
    const closeCountryModal = () => setcountryModal(false);

    const onSaveLead = async () => {
        setLoading(true);
        if (checkForEmpty(inputs.company_name)) {
            showToast('Pleaase enter company name');
        } else if (checkForEmpty(inputs.contact_name)) {
            showToast('Pleaase enter contact name');
        } else if (checkForEmpty(inputs.countryname)) {
            showToast('Pleaase enter select any country');
        } else if (checkForEmpty(inputs.contact_number)) {
            showToast('Pleaase enter your mobile number');
        } else if (emailCheck(inputs.emailId)) {
            showToast('Pleaase enter valid email id');
        } else if (checkForEmpty(inputs.source)) {
            showToast('Pleaase select any source');
        }
        else {
            try {
                const fnName = 'updateLead';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                formData.append('client_id', leadDetail['client_id']);
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
                !checkForEmpty(inputs.skype) && formData.append('skype', inputs.skype);
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
                const response = await updateLead({ token, formData });
                showToast(response.message);
                if (response.success == 1) {
                    reloadPage();
                    navigate('BottomTab', { screen: 'MyLeads' });
                }
            } catch (error) {
                console.log('Error inside onsaveLead function : ', error);
            }
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchCities();
    }, [fetchCities]);




    return {
        city,
        inputs,
        states,
        sources,
        loading,
        onSelect,
        cityLoad,
        outsiders,
        addPrefix,
        stateLoad,
        onSaveLead,
        removePrefix,
        onChangeText,
        countryModal,
        disabledCheck,
        editableCheck,
        onSelectCountry,
        openCountryModal,
        closeCountryModal,
    };
};
export { useEditLeadHook };