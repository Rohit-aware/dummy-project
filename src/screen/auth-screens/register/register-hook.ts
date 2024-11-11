import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useCommonStore, useRegisterStore } from "../../../store";

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
    orgLoad: boolean;
    onSelect: (name: string, data: any) => void;
    onRegister: () => Promise<void>;
    onChangeText: (name: string, value: string) => void;
    organization: any[];
    getAllOrganization: () => void;
    onOrgnizationSelect: (name: string, data: any) => void;
};


const useRegisterHook = (): useRegisterHookprops => {
    const { goBack } = useNavigation();
    const { processRegistration } = useRegisterStore();
    const { organizationData: organization, orgLoad, getAllOrganization, } = useCommonStore();

    const [inputs, setInputs] = React.useState({
        first_name: 'Test',
        last_name: 'User',
        phone_number: '1234567895',
        email: 'testuser@email.com',
        address: '',
        password: '12345678',
        confirm_password: '12345678',
        state_id: '',
        city_id: '',
        gender: '',
        organization_name: '',
        countrycode: '91',
    });

    const Genders = [
        { short_name: "M", full_name: "Male" },
        { short_name: "F", full_name: "Female" },
        { short_name: "O", full_name: "Others" },
    ]

    const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });

    const onOrgnizationSelect = (name: string, data: any) =>
        setInputs({ ...inputs, [name]: data['organization_name'] });

    const getOrgnization = (name: string) =>
        organization.find((e) => e['organization_name'] == name)!['organization_id'];

    const onSelect = (name: string, data: any) =>
        setInputs({ ...inputs, [name]: data['full_name'] });

    const getSelectedGender = () => (inputs.gender === 'Male' ? 'M' : 'F');

    const onRegister = async (): Promise<void> => {
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
            formdata.append('address', null);
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
        }
    };

    return {
        inputs,
        Genders,
        orgLoad,
        onSelect,
        onRegister,
        onChangeText,
        organization,
        getAllOrganization,
        onOrgnizationSelect,
    }
}
export { useRegisterHook }