import React from "react";
import { helpers } from "../../utility";
import { showToast } from "../../components";
import { endpoints } from "../../services/endpoints";
import { getHashString } from "../../utility/hashing";
import DocumentPicker from 'react-native-document-picker';
import { networkRequest } from "../../services/network-request";
import { useAuthStore, useCommonStore, useProfileStore } from "../../store";

const useEditProfileHook = () => {
    const { aadharno, checkForEmpty, phoneno, regexEmail, Genders } = helpers;
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const {
        getPersonalDetails,
        personalDetails: {
            first_name,
            last_name,
            phone_code,
            phone,
            email,
            address,
            account_number,
            ifsc_code,
            pancard_number,
            aadhar_number,
            designation,
            gender,
            state_id,
            city_id,
            aadhar_card_path: aadhar_card,
            pancard_path: pancard,
            pancard: pan_file_name,
            aadhar_card: aadhar_file_name,
            state_name,
            city_name,
        }
    } = useProfileStore();
    const { stateData: states, cityData: city, cityLoad, getCity } = useCommonStore();
    const [loading, setLoading] = React.useState(false);
    const [inputs, setInputs] = React.useState<any>({
        first_name,
        last_name,
        phone_code,
        phone,
        email,
        designation,
        gender,
        address,
        state_id,
        city_id,
        state_name,
        city_name,
        account_number,
        ifsc_code,
        pancard_number,
        aadhar_number,
        pancard,
        aadhar_card,
        pan_file_name,
        aadhar_file_name,
    });
    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });
    const panCheck = () => {
        const error =
            inputs.pancard_number !== '' && inputs.pancard_number.length < 10
                ? true
                : false;
        return error;
    };

    const aadharCheck = () => {
        const error =
            inputs.aadhar_number !== '' &&
                inputs.aadhar_number.length < 12 &&
                !aadharno.test(inputs.aadhar_number)
                ? true
                : false;
        return error;
    };

    const onSelect = (name: string, data: any) => {
        name === 'gender'
            ? setInputs({ ...inputs, [name]: data['full_name'] })
            : name == 'state_name'
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
                    : null;
    };

    const fetchCities = async () => {
        if (inputs.state_id !== '0' && inputs.state_id !== '') {
            try {
                const formData = new FormData();
                formData.append('state_id', inputs.state_id);
                getCity({ token: token, formData })
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onUpload = async (name: string) => {
        try {
            const response = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            name == 'aadhar_card'
                ? setInputs({
                    ...inputs,
                    aadhar_card: {
                        uri: response.uri,
                        type: response.type,
                        name: response.name,
                    },
                    aadhar_file_name: response.name,
                })
                : setInputs({
                    ...inputs,
                    pancard: {
                        uri: response.uri,
                        type: response.type,
                        name: response.name,
                    },
                    pan_file_name: response.name,
                });
        } catch (error) { }
    };
    const onEdit = async () => {
        if (checkForEmpty(inputs.first_name)) {
            showToast('Please enter first name');
        } else if (checkForEmpty(inputs.last_name)) {
            showToast('Please enter last name');
        } else if (checkForEmpty(inputs.phone)) {
            showToast('Please enter phone number');
        } else if (inputs.phone.length < 10 && phone_code === 91) {
            showToast('Please enter 10 digit phone number');
        }
        else if (!phoneno.test(inputs.phone)) {
            showToast('Please enter valid phone number');
        } else if (checkForEmpty(inputs.email)) {
            showToast('Please enter email id');
        } else if (!regexEmail.test(inputs.email)) {
            showToast('Please enter valid email id');
        } else if (checkForEmpty(inputs.designation)) {
            showToast('Please enter designation');
        } else if (checkForEmpty(inputs.address)) {
            showToast('Please enter address');
        } else if (checkForEmpty(inputs.gender)) {
            showToast('Please select gender');
        } else if (panCheck()) {
            showToast('Please enter 10 digit pan card number');
        } else if (aadharCheck()) {
            showToast('Please enter 12 digit aadhar card number');
        } else {
            try {
                setLoading(true);
                const fnName = 'updateProfile';
                const hash_key = getHashString(
                    userData.mkey!,
                    userData.msalt!,
                    uuid,
                    fnName,
                );
                const formData = new FormData();
                formData.append('first_name', inputs.first_name);
                formData.append('last_name', inputs.last_name);
                formData.append('phone', inputs.phone);
                formData.append('email', inputs.email);
                formData.append('designation', inputs.designation);
                formData.append('gender', inputs.gender == 'Male' ? 'M' : 'F');
                formData.append('address', inputs.address);
                !checkForEmpty(inputs.state_id) &&
                    formData.append('state_id', inputs.state_id);
                !checkForEmpty(inputs.city_id) &&
                    formData.append('city_id', inputs.city_id);
                !checkForEmpty(inputs.account_number) &&
                    formData.append('account_number', inputs.account_number);
                !checkForEmpty(inputs.ifsc_code) &&
                    formData.append('ifsc_code', inputs.ifsc_code);
                !checkForEmpty(inputs.pancard_number) &&
                    formData.append('pancard_number', inputs.pancard_number);
                !checkForEmpty(inputs.aadhar_number) &&
                    formData.append('aadhar_number', inputs.aadhar_number);
                !checkForEmpty(inputs.pancard) && inputs.pancard.uri
                    ? formData.append('pancard', inputs.pancard)
                    : null;
                !checkForEmpty(inputs.aadhar_card) && inputs.aadhar_card.uri
                    ? formData.append('aadhar_card', inputs.aadhar_card)
                    : null;
                formData.append('uuid', uuid);
                formData.append('hash_key', hash_key);
                const response = await networkRequest({ token }).post(endpoints.updateProfile, formData);
                showToast(response.data.message);
                if (response.data.success === '1') {
                    updatePersonaldetails();
                }
            } catch (error) {
                console.log(error, 'error located at onEdit in edit profile');
            }
        }
        setLoading(false);
    };

    const updatePersonaldetails = async () => {
        const fnName = 'getPersonalDetails';
        const hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
        const formData = { uuid, hash_key };
        getPersonalDetails({ token, formData });
    };

    React.useEffect(() => {
        fetchCities();
    }, [inputs.state_id]);

    return {
        city,
        states,
        inputs,
        onEdit,
        Genders,
        loading,
        onSelect,
        cityLoad,
        onUpload,
        phone_code,
        onChangeText,
    };
};
export { useEditProfileHook };