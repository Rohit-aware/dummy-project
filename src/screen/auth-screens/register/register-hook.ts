import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useCommonStore, useRegisterStore } from "../../../store";
import { helpers } from "../../../utility";
import { showToast } from "../../../components";

interface useRegisterHookprops {
    inputs: {
        first_name: string;
        last_name: string;
        phone_number: string;
        email: string;
        address: string;
        password: string;
        confirm_password: string;
        state_id: string;
        city_id: string;
        gender: string;
        organization_name: string;
        countrycode: string;
    };
    Genders: {
        short_name: string;
        full_name: string;
    }[];
    show: boolean;
    loading: boolean;
    orgLoad: boolean;
    closeModal: () => void;
    showModal: () => void;
    onSelectCountry: (item: any) => void;
    onSelect: (name: string, data: any) => void;
    onRegister: () => Promise<void>;
    onChangeText: (name: string, value: string) => void;
    organization: any[];
    getAllOrganization: () => void;
    onOrgnizationSelect: (name: string, data: any) => void;
};


const useRegisterHook = (): useRegisterHookprops => {
    const { goBack } = useNavigation();
    const { processRegistration, loading } = useRegisterStore();
    const { organizationData: organization, orgLoad, getAllOrganization, } = useCommonStore();

    const [show, setShow] = React.useState(false);
    const [inputs, setInputs] = React.useState({
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
    const { checkForEmpty, regexEmail, phoneno } = helpers;

    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);
    const Genders = [
        { short_name: "M", full_name: "Male" },
        { short_name: "F", full_name: "Female" },
        { short_name: "O", full_name: "Others" },
    ];

    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });
    const onSelectCountry = (country: any) => {
        setInputs({ ...inputs, phone_number: '' })
        const { callingCode } = country;
        setInputs({
            ...inputs,
            countrycode: callingCode.toString(),
        });
    };

    const passwordCheck = () =>
        inputs.password == inputs.confirm_password ? false : true;

    const onOrgnizationSelect = (name: string, data: any) =>
        setInputs({ ...inputs, [name]: data['organization_name'] });

    const getOrgnization = (name: string) =>
        organization.find((e) => e['organization_name'] == name)!['organization_id'];

    const onSelect = (name: string, data: any) =>
        setInputs({ ...inputs, [name]: data['full_name'] });

    const getSelectedGender = () => (inputs.gender === 'Male' ? 'M' : 'F');

    const onRegister = async (): Promise<void> => {
        if (checkForEmpty(inputs.first_name)) {
            showToast('Please enter first name');
        } else if (checkForEmpty(inputs.last_name)) {
            showToast('Please enter last name');
        } else if (checkForEmpty(inputs.phone_number)) {
            showToast('Please enter phone number');
        } else if (inputs.phone_number.length < 10 && inputs.countrycode == '91') {
            showToast('Please enter 10 digit phone number');
        }
        else if (!phoneno.test(inputs.phone_number)) {
            showToast('Please enter valid phone number');
        } else if (checkForEmpty(inputs.email)) {
            showToast('Please enter official email id');
        } else if (!regexEmail.test(inputs.email)) {
            showToast('Please enter valid official email id');
        } else if (checkForEmpty(inputs.password)) {
            showToast('Please enter password');
        } else if (checkForEmpty(inputs.confirm_password)) {
            showToast('Please enter confirm password');
        } else if (checkForEmpty(inputs.confirm_password)) {
            showToast('Please enter confirm password');
        } else if (passwordCheck()) {
            showToast('password and confirm password should match');
        } else if (checkForEmpty(inputs.gender)) {
            showToast('Please select gender');
        } else if (checkForEmpty(inputs.organization_name)) {
            showToast('Please select orgnization');
        } else {
            try {
                const formdata = new FormData();
                formdata.append('first_name', inputs.first_name);
                formdata.append('last_name', inputs.last_name);
                formdata.append('phone_code', inputs.countrycode);
                formdata.append('phone_number', inputs.phone_number);
                formdata.append('email', inputs.email);
                formdata.append('password', inputs.password);
                formdata.append('confirm_password', inputs.confirm_password);
                formdata.append('gender', getSelectedGender());
                formdata.append('designation', '');
                formdata.append('address', '');
                formdata.append('state_id', '');
                formdata.append('city_id', '');
                formdata.append('location', '');
                formdata.append('organization_id', getOrgnization(inputs.organization_name));
                const response = await processRegistration({ formdata });
                if (response.success == 1) {
                    goBack();
                }
            } catch (error) {
                console.log(error, 'error at onRegister');
            };
        };
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
    }
}
export { useRegisterHook }