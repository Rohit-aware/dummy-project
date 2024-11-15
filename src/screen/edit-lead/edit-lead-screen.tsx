import React from 'react';
import { styles } from './styles';
import { Colors } from '../../constants';
import { ScrollView, View } from 'react-native';
import { useEditLeadHook } from './edit-lead-hook';
import CountryPicker from 'react-native-country-picker-modal';
import { Button, DropdownButton, Header, InputBox, NumberInput, StateCityModal } from '../../components';

const EditLead = () => {
    const {
        city,
        inputs,
        states,
        sources,
        loading,
        onSelect,
        addPrefix,
        cityLoad,
        outsiders,
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
    } = useEditLeadHook();
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title='Edit Lead' />
            <ScrollView
                contentContainerStyle={styles.contentcontainer}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}>
                <InputBox
                    placeholder={'Company Name'}
                    star
                    onChangeText={onChangeText}
                    name={'company_name'}
                    value={inputs.company_name}
                    editable={editableCheck()}
                />

                <InputBox
                    placeholder={'Contact Name'}
                    star
                    onChangeText={onChangeText}
                    name={'contact_name'}
                    value={inputs.contact_name}
                    editable={editableCheck()}
                />
                <InputBox
                    placeholder={'Designation'}
                    onChangeText={onChangeText}
                    name={'designation'}
                    value={inputs.designation}
                />

                <DropdownButton
                    placeholder={'Country Name'}
                    value={inputs.countryname}
                    star
                    onSelect={onSelect}
                    onPress={openCountryModal}
                    disabled={disabledCheck()}
                />

                <NumberInput
                    placeholder={'Contact Number'}
                    star
                    onChangeText={onChangeText}
                    name={'contact_number'}
                    value={inputs.contact_number}
                    maxLength={17}
                    countrycode={inputs.countrycode}
                    editable={editableCheck()}
                />

                <InputBox
                    placeholder={'Email ID'}
                    onChangeText={onChangeText}
                    name={'emailId'}
                    value={inputs.emailId}
                    multiLine={true}
                />
                <DropdownButton
                    placeholder={'Source'}
                    value={inputs.source}
                    star
                    data={sources}
                    onSelect={onSelect}
                    name={'source'}
                    disabled={disabledCheck()}
                />
                {inputs.source == 'outsider' && (
                    <DropdownButton
                        placeholder={'Outsiders Name'}
                        value={inputs.outsider_name}
                        data={outsiders}
                        onSelect={onSelect}
                        name={'outsider_name'}
                    />
                )}

                <InputBox
                    placeholder={'Skype ID'}
                    onChangeText={onChangeText}
                    name={'skype'}
                    value={inputs.skype}
                />

                <InputBox
                    placeholder={'LinkedIn'}
                    onChangeText={onChangeText}
                    name={'linkedIn'}
                    value={inputs.linkedIn}
                    onFocus={() => addPrefix({ name: 'linkedIn' })}
                    onBlur={() => removePrefix({ name: 'linkedIn' })}
                    containerStyle={styles.linkContainer}
                    textinputStyle={styles.linkInput}
                    placeholderStyle={styles.placeholderStyle}
                    multiLine={true}
                />
                <InputBox
                    placeholder={'Website Url'}
                    onChangeText={onChangeText}
                    name={'website_url'}
                    value={inputs.website_url}
                    onFocus={() => addPrefix({ name: 'website_url' })}
                    onBlur={() => removePrefix({ name: 'website_url' })}
                    containerStyle={styles.linkContainer}
                    textinputStyle={styles.linkInput}
                    placeholderStyle={styles.placeholderStyle}
                    multiLine={true}
                />

                {inputs.countrycode == '91' && (
                    <>
                        <InputBox
                            placeholder={'Address'}
                            onChangeText={onChangeText}
                            name={'address'}
                            value={inputs.address}
                        />
                        <View style={styles.wrapper}>
                            <StateCityModal
                                placeholder="State"
                                containerStyle={styles.childcontainer}
                                name="state_name"
                                value={inputs.state_name}
                                onPress={onSelect}
                                data={states}
                                headerTitle="Select State"
                                disabled={disabledCheck()}
                                loading={stateLoad}
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
                                disabled={disabledCheck()}
                            />
                        </View>
                    </>
                )}

                <InputBox
                    placeholder={'Requirement'}
                    onChangeText={onChangeText}
                    name={'requirement'}
                    value={inputs.requirement}
                    multiLine={true}
                    containerStyle={styles.linkContainer}
                    placeholderStyle={styles.placeholderStyle}
                    textinputStyle={styles.linkInput}
                />

                <Button
                    title={'SAVE'}
                    onPress={onSaveLead}
                    style={styles.button}
                    loading={loading}
                />
            </ScrollView>

            <CountryPicker
                countryCode='IN'
                visible={true}
                modalProps={{ visible: countryModal }}
                onSelect={onSelectCountry}
                onClose={closeCountryModal}
                withFilter
                withCallingCode
                containerButtonStyle={styles.countrybuttonstyle}
            />
        </View>
    )
}

export default EditLead;