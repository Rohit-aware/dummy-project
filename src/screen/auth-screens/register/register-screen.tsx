import React from 'react';
import { styles } from './styles';
import { View, ScrollView } from 'react-native';
import { useRegisterHook } from './register-hook';
import CountryPicker from 'react-native-country-picker-modal';
import { Button, DropdownButton, Header, InputBox, NumberInput } from '../../../components';

const Register = () => {

  const {
    show,
    inputs,
    Genders,
    loading,
    orgLoad,
    onSelect,
    showModal,
    onRegister,
    closeModal,
    onChangeText,
    organization,
    onSelectCountry,
    getAllOrganization,
    onOrgnizationSelect,
  } = useRegisterHook();

  React.useEffect(() => {
    getAllOrganization()
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
          onPressCode={showModal}
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
          data={Genders}
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
          loading={orgLoad}
        />
        <View style={styles.btncontainer}>
          <Button title={'Register'} onPress={onRegister} loading={loading} />
        </View>
      </ScrollView>
      {show &&
        <CountryPicker
          countryCode='IN'
          visible={true}
          modalProps={{ visible: show }}
          onSelect={onSelectCountry}
          onClose={closeModal}
          withFilter
          withCallingCode
          containerButtonStyle={{}}
        />
      }
    </View>
  );
};
export default Register;