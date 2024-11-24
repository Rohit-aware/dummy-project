import React from "react";
import { helpers } from "../../../utility";
import { showToast } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { useCommonStore, useRegisterStore } from "../../../store";

type GenderInput = "Male" | "Female" | "Other" | '';
type Gender = "M" | "F" | "O";

interface RegisterInputs {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    address: string;
    password: string;
    confirm_password: string;
    state_id: string;
    city_id: string;
    gender: GenderInput;
    organization_name: string;
    countrycode: string;
}

const validateRegister = (inputs: RegisterInputs) => {
    const { checkForEmpty, phoneno, regexEmail } = helpers;
    const validationErrors = [
        { condition: checkForEmpty(inputs.first_name), message: 'Please enter first name' },
        { condition: checkForEmpty(inputs.last_name), message: 'Please enter last name' },
        { condition: checkForEmpty(inputs.phone_number), message: 'Please enter phone number' },
        { condition: inputs.phone_number.length < 10 && inputs.countrycode === '91', message: 'Please enter 10 digit phone number' },
        { condition: !phoneno.test(inputs.phone_number), message: 'Please enter valid phone number' },
        { condition: checkForEmpty(inputs.email), message: 'Please enter official email id' },
        { condition: !regexEmail.test(inputs.email), message: 'Please enter valid official email id' },
        { condition: checkForEmpty(inputs.password), message: 'Please enter password' },
        { condition: checkForEmpty(inputs.confirm_password), message: 'Please enter confirm password' },
        { condition: inputs.password !== inputs.confirm_password, message: 'Password and confirm password should match' },
        { condition: checkForEmpty(inputs.gender), message: 'Please select gender' },
        { condition: checkForEmpty(inputs.organization_name), message: 'Please select organization' },
    ];

    return validationErrors;
};

const useRegisterHook = () => {
    const { Genders } = helpers;
    const { goBack } = useNavigation();
    const { processRegistration, loading } = useRegisterStore();
    const { organizationData: organization, orgLoad, getAllOrganization } = useCommonStore();

    const [show, setShow] = React.useState(false);
    const [inputs, setInputs] = React.useState<RegisterInputs>({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: '',
        password: '',
        confirm_password: '',
        state_id: '',
        city_id: '',
        gender: '',
        organization_name: '',
        countrycode: '91',
    });

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    const onChangeText = (name: keyof RegisterInputs, value: string) => setInputs(prev => ({ ...prev, [name]: value }));

    const onSelectCountry = (country: any) => {
        const { callingCode } = country;
        setInputs(prev => ({ ...prev, phone_number: '', countrycode: callingCode.toString() }));
    };

    const onOrgnizationSelect = (name: string, data: any) => setInputs(prev => ({ ...prev, [name]: data['organization_name'] }));

    const getOrgnization = (name: string) => organization.find(e => e['organization_name'] === name)?.['organization_id'];

    const onSelect = (name: string, data: any) => setInputs(prev => ({ ...prev, [name]: data['full_name'] }));

    const getSelectedGender = (gender: GenderInput): Gender => {
        switch (gender) {
            case 'Male': return 'M';
            case 'Female': return 'F';
            case 'Other': return 'O';
            default: return 'M';
        };
    };
    
    const onRegister = async (): Promise<void> => {
        const validationErrors = validateRegister(inputs);
        for (const error of validationErrors) {
            if (error.condition) {
                showToast(error.message);
                return;
            }
        }

        try {
            const formdata = new FormData();
            formdata.append('first_name', inputs.first_name);
            formdata.append('last_name', inputs.last_name);
            formdata.append('phone_code', inputs.countrycode);
            formdata.append('phone_number', inputs.phone_number);
            formdata.append('email', inputs.email);
            formdata.append('password', inputs.password);
            formdata.append('confirm_password', inputs.confirm_password);
            formdata.append('gender', getSelectedGender(inputs.gender));
            formdata.append('organization_id', getOrgnization(inputs.organization_name) || '');

            const response = await processRegistration({ formdata });
            if (response.success === 1) goBack();
        } catch (error) {
            console.error('Error at onRegister:', error);
        }
    };

    return {
        show,
        inputs,
        Genders,
        orgLoad,
        loading,
        onSelect,
        showModal,
        closeModal,
        onRegister,
        organization,
        onChangeText,
        onSelectCountry,
        getAllOrganization,
        onOrgnizationSelect,
    };
};

export { useRegisterHook };