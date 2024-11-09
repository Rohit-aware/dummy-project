import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { Button, DropdownButton, Header, InputBox, NumberInput } from '../../../components';

export default () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const organization: [] = [];
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

  const [countryModal, setcountryModal] = React.useState(false);
  const onSelectCountry = (country: any) => {
    setInputs({ ...inputs, phone_number: '' })
    const { callingCode } = country;
    setInputs({
      ...inputs,
      countrycode: callingCode.toString(),
    });
  };

  const openCountryModal = () => setcountryModal(true);
  const closeCountryModal = () => setcountryModal(false);
  const onChangeText = (name: string, value: string) => setInputs({ ...inputs, [name]: value });

  const passwordCheck = () =>
    inputs.password == inputs.confirm_password ? false : true;

  const onOrgnizationSelect = (name: string, data: any) =>
    setInputs({ ...inputs, [name]: data['organization_name'] });

  const getOrgnization = (name: string) =>
    organization.find((e) => e['organization_name'] == name)!['organization_id'];

  const onSelect = (name: string, data: any) =>
    setInputs({ ...inputs, [name]: data['full_name'] });

  const getSelectedGender = () => (inputs.gender === 'Male' ? 'M' : 'F');
  const onRegister = async () => {
    try {
      setLoading(true);
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
      console.log(JSON.stringify(formdata, undefined, 4), 'formdata ')
      // const response = await dispatch(processRegistration(formdata));
      setLoading(false);
      // if (response.payload.success == 1) {
      //   navigation.goBack();
      // }
    } catch (error) {
      console.log(error, 'error at onRegister');
    }
  };

  React.useEffect(() => {
    // dispatch(getAllOrganization());
  }, []);

  return (
    <View style={styles.root}>
      <Header title={'Register'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.wrapper}>
          <InputBox
            name={'first_name'}
            star
            value={inputs.first_name}
            onChangeText={onChangeText}
            placeholder={'First Name'}
            containerStyle={styles.rightcontainer}
          />
          <InputBox
            name={'last_name'}
            star
            value={inputs.last_name}
            onChangeText={onChangeText}
            placeholder={'Last Name'}
            containerStyle={styles.leftcontainer}
          />
        </View>
        <NumberInput
          name={'phone_number'}
          star
          value={inputs.phone_number}
          onChangeText={onChangeText}
          placeholder={'Contact Number'}
          maxLength={17}
          keyboardType={'numeric'}
          countrycode={inputs.countrycode}
          onPressCode={openCountryModal}
        />

        <InputBox
          name={'email'}
          star
          value={inputs.email}
          onChangeText={onChangeText}
          placeholder={'Official Email ID'}
        />
        <InputBox
          name={'password'}
          star
          value={inputs.password}
          onChangeText={onChangeText}
          placeholder={'Password'}
          secureTextEntry
        />
        <InputBox
          name={'confirm_password'}
          star
          value={inputs.confirm_password}
          onChangeText={onChangeText}
          placeholder={'Confirm Password'}
          secureTextEntry
        />
        <DropdownButton
          star
          placeholder={'Gender'}
          data={['']}
          onSelect={onSelect}
          name={'gender'}
          value={inputs.gender}
        />
        <DropdownButton
          star
          placeholder={'Organization'}
          data={organization}
          onSelect={onOrgnizationSelect}
          name={'organization_name'}
          value={inputs.organization_name}
          loading={false}
        />
        <View style={styles.btncontainer}>
          <Button title={'Register'} onPress={onRegister} loading={loading} />
        </View>
      </ScrollView>
      {/* {countryModal &&
        <CountryPicker
          visible={true}
          modalProps={{ visible: countryModal }}
          onSelect={onSelectCountry}
          onClose={closeCountryModal}
          withFilter
          withCallingCode
          containerButtonStyle={styles.countrybuttonstyle}
        />
      } */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 20,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  rightcontainer: {
    flex: 0.47,
    marginHorizontal: 0,
  },
  leftcontainer: {
    flex: 0.47,
    marginHorizontal: 0,
  },
  btncontainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
