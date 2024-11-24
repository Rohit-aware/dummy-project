import React from "react";
import { helpers } from "../../utility";
import { showToast } from "../../components";
import { endpoints } from "../../services/endpoints";
import { getHashString } from "../../utility/hashing";
import DocumentPicker from 'react-native-document-picker';
import { networkRequest } from "../../services/network-request";
import { useAuthStore, useCommonStore, useProfileStore } from "../../store";

type Gender = "M" | "F" | "Other";

interface ProfileInputs {
    first_name: string;
    last_name: string;
    phone_code: number;
    phone: string;
    email: string;
    designation: string;
    gender: Gender;
    address: string;
    state_id: string | number;
    city_id: string | number;
    state_name: string;
    city_name: string;
    account_number: string;
    ifsc_code: string;
    pancard_number: string;
    aadhar_number: string;
    pancard: string;
    aadhar_card: string;
    pan_file_name: string;
    aadhar_file_name: string;
}

const validateProfile = (inputs: ProfileInputs) => {
    const { checkForEmpty, phoneno, regexEmail, aadharno } = helpers;
    const validationErrors = [
        { condition: checkForEmpty(inputs.first_name), message: 'Please enter first name' },
        { condition: checkForEmpty(inputs.last_name), message: 'Please enter last name' },
        { condition: checkForEmpty(inputs.phone), message: 'Please enter phone number' },
        { condition: inputs.phone.length < 10 && inputs.phone_code === 91, message: 'Please enter 10 digit phone number' },
        { condition: !phoneno.test(inputs.phone), message: 'Please enter valid phone number' },
        { condition: checkForEmpty(inputs.email), message: 'Please enter email id' },
        { condition: !regexEmail.test(inputs.email), message: 'Please enter valid email id' },
        { condition: checkForEmpty(inputs.designation), message: 'Please enter designation' },
        { condition: checkForEmpty(inputs.address), message: 'Please enter address' },
        { condition: checkForEmpty(inputs.gender), message: 'Please select gender' },
        { condition: inputs.pancard_number !== '' && inputs.pancard_number.length < 10, message: 'Please enter 10 digit pan card number' },
        { condition: inputs.aadhar_number !== '' && inputs.aadhar_number.length < 12 && !aadharno.test(inputs.aadhar_number), message: 'Please enter 12 digit aadhar card number' },
    ];

    return validationErrors;
};

const useEditProfileHook = () => {
    const { Genders } = helpers;
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { getPersonalDetails, personalDetails } = useProfileStore();
    const { stateData: states, cityData: city, cityLoad, getCity } = useCommonStore();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [inputs, setInputs] = React.useState<ProfileInputs>({
        first_name: personalDetails.first_name,
        last_name: personalDetails.last_name,
        phone_code: personalDetails.phone_code,
        phone: personalDetails.phone,
        email: personalDetails.email,
        designation: personalDetails.designation,
        gender: personalDetails.gender,
        address: personalDetails.address,
        state_id: personalDetails.state_id,
        city_id: personalDetails.city_id,
        state_name: personalDetails.state_name,
        city_name: personalDetails.city_name,
        account_number: personalDetails.account_number,
        ifsc_code: personalDetails.ifsc_code,
        pancard_number: personalDetails.pancard_number,
        aadhar_number: personalDetails.aadhar_number,
        pancard: personalDetails.pancard_path,
        aadhar_card: personalDetails.aadhar_card_path,
        pan_file_name: personalDetails.pancard,
        aadhar_file_name: personalDetails.aadhar_card,
    });

    const onChangeText = (name: keyof ProfileInputs, value: string) => setInputs(prev => ({ ...prev, [name]: value }));

    const onSelect = (name: keyof ProfileInputs, data: any) => {
        setInputs(prev => ({
            ...prev,
            [name === 'gender' ? 'gender' : name]: name === 'state_name' || name === 'city_name' ? data : data['full_name']
        }));
    };

    const fetchCities = React.useCallback(async () => {
        if (inputs.state_id && inputs.state_id !== '0') {
            try {
                const formData = new FormData();
                formData.append('state_id', inputs.state_id as string);
                getCity({ token: token, formData });
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        }
    }, [inputs.state_id, token]);

    const onUpload = async (name: string) => {
        try {
            const response = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            const newFile = {
                uri: response.uri,
                type: response.type,
                name: response.name,
            };
            setInputs(prev => ({
                ...prev,
                [name === 'aadhar_card' ? 'aadhar_card' : 'pancard']: newFile,
                [name === 'aadhar_card' ? 'aadhar_file_name' : 'pan_file_name']: response.name,
            }));
        } catch (error) {
            console.error('Error uploading document:', error);
        }
    };

    const onEdit = async () => {
        const validationErrors = validateProfile(inputs);
        for (const error of validationErrors) {
            if (error.condition) {
                showToast(error.message);
                return;
            }
        }

        try {
            setLoading(true);
            const fnName = 'updateProfile';
            const hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
            const formData = new FormData();

            Object.keys(inputs).forEach((key) => {
                const inputKey = key as keyof ProfileInputs;
                const inputValue = inputs[inputKey];

                if (inputValue && typeof inputValue === 'object' && 'uri' in inputValue) {
                    formData.append(inputKey, inputValue);
                } else if (inputValue && inputValue !== '' && inputKey !== 'pancard' && inputKey !== 'aadhar_card') {
                    formData.append(inputKey, inputValue);
                }
            });

            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);

            const response = await networkRequest({ token }).post(endpoints.updateProfile, formData);
            showToast(response.data.message);
            if (response.data.success === '1') {
                updatePersonaldetails();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const updatePersonaldetails = async () => {
        const fnName = 'getPersonalDetails';
        const hash_key = getHashString(userData.mkey!, userData.msalt!, uuid, fnName);
        const formData = { uuid, hash_key };
        getPersonalDetails({ token, formData });
    };

    React.useEffect(() => {
        fetchCities();
    }, [fetchCities]);

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
        onChangeText,
    };
};

export { useEditProfileHook };
