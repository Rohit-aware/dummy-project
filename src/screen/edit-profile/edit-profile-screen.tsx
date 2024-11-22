import React from 'react';
import { Colors } from '../../constants';
import { useEditProfileHook } from './edit-profile-hook';
import UploadDocument from './components/upload-document';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, DropdownButton, Header, InputBox, StateCityModal } from '../../components';

const EditProfile = () => {

    const {
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
    } = useEditProfileHook();
    return (
        <View style={styles.root}>
            <Header title="Edit Profile" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.wrapper}>
                    <InputBox
                        name={'first_name'}
                        star
                        value={inputs.first_name}
                        onChangeText={onChangeText}
                        placeholder={'First Name'}
                        containerStyle={styles.childcontainer}
                    />
                    <InputBox
                        name={'last_name'}
                        star
                        value={inputs.last_name}
                        onChangeText={onChangeText}
                        placeholder={'Last Name'}
                        containerStyle={styles.childcontainer}
                    />
                </View>
                <InputBox
                    name={'phone'}
                    star
                    value={inputs.phone}
                    onChangeText={onChangeText}
                    placeholder={'Contact Number'}
                    keyboardType={'numeric'}
                    maxLength={17}
                />
                <InputBox
                    name={'email'}
                    star
                    value={inputs.email}
                    onChangeText={onChangeText}
                    placeholder={'Official Email ID'}
                    editable={false}
                />
                <InputBox
                    name={'designation'}
                    star
                    value={inputs.designation}
                    onChangeText={onChangeText}
                    placeholder={'Designation'}
                    editable={false}
                />
                <InputBox
                    name={'address'}
                    star
                    value={inputs.address == 'null' ? '' : inputs.address}
                    onChangeText={onChangeText}
                    placeholder={'Address'}
                />
                <DropdownButton
                    star
                    placeholder={'Gender'}
                    data={Genders}
                    onSelect={onSelect}
                    name={'gender'}
                    value={inputs.gender}
                />
                {phone_code == 91 &&
                    <View style={styles.wrapper}>
                        <StateCityModal
                            placeholder="State"
                            containerStyle={styles.childcontainer}
                            name="state_name"
                            value={inputs.state_name}
                            onPress={onSelect}
                            data={states}
                            headerTitle="Select State"
                        />
                        <StateCityModal
                            placeholder="City"
                            containerStyle={styles.childcontainer}
                            name="city_name"
                            value={inputs.city_name}
                            onPress={onSelect}
                            data={city}
                            dependentValue={inputs.state_id == '0' ? '' : inputs.state_id}
                            headerTitle="Select City"
                            loading={cityLoad}
                        />
                    </View>
                }
                <InputBox
                    name={'account_number'}
                    value={inputs.account_number}
                    onChangeText={onChangeText}
                    placeholder={'Account Number'}
                />
                <InputBox
                    name={'ifsc_code'}
                    value={inputs.ifsc_code}
                    onChangeText={onChangeText}
                    placeholder={'IFSC Code'}
                />
                <InputBox
                    name={'pancard_number'}
                    value={inputs.pancard_number}
                    onChangeText={onChangeText}
                    placeholder={'Pan Card'}
                    maxLength={10}
                />

                <UploadDocument
                    filename={inputs.pan_file_name}
                    placeholder={'Upload your PAN Card'}
                    onUpload={() => onUpload('pan_card')}
                />

                <InputBox
                    name={'aadhar_number'}
                    value={inputs.aadhar_number}
                    onChangeText={onChangeText}
                    placeholder={'Aadhar Number'}
                    maxLength={12}
                    keyboardType={'numeric'}
                />
                <UploadDocument
                    filename={inputs.aadhar_file_name}
                    placeholder={'Upload your Aadhar Card'}
                    onUpload={() => onUpload('aadhar_card')}
                />
                <Button onPress={onEdit} title="EDIT" loading={loading} />
            </ScrollView>
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
        paddingTop: 30,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    childcontainer: {
        flex: 0.47,
        marginHorizontal: 0,
    },
});

export default EditProfile;