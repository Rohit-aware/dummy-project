import React from 'react'
import { styles } from './styles';
import { ScrollView, View } from 'react-native';
import { useAddLeadHook } from './add-lead-hook';
import CountryPicker from 'react-native-country-picker-modal';
import { Button, DropdownButton, Header, InputBox, NumberInput, StateCityModal } from '../../components'

const AddLead = () => {
    const {
        inputs,
        sources,
        addLead,
        onSelect,
        cityLoad,
        cityData,
        stateData,
        stateLoad,
        addPrefix,
        removePrefix,
        outsiderData,
        onChangeText,
        countryModal,
        onSelectCountry,
        openCountryModal,
        closeCountryModal,
    } = useAddLeadHook();
    console.log(inputs)
    return (
        <View style={styles.container}>
            <Header title={'Add Lead'} />
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
                />
                <InputBox
                    placeholder={'Contact Name'}
                    star
                    onChangeText={onChangeText}
                    name={'contact_name'}
                    value={inputs.contact_name}
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
                    name={''} data={''} />

                <NumberInput
                    placeholder={'Contact Number'}
                    star
                    onChangeText={onChangeText}
                    name={'contact_number'}
                    value={inputs.contact_number}
                    maxLength={17}
                    countrycode={inputs.countrycode}
                    onPressCode={openCountryModal}
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
                />
                {inputs.source == 'outsider' && (
                    <DropdownButton
                        placeholder={'Outsiders Name'}
                        value={inputs.outsider_name}
                        data={outsiderData}
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
                                data={stateData}
                                headerTitle="Select State"
                                loading={stateLoad}
                            />
                            <StateCityModal
                                placeholder="City"
                                containerStyle={styles.childcontainer}
                                name="city_name"
                                value={inputs.city_name}
                                onPress={onSelect}
                                data={cityData}
                                dependentValue={inputs.state_id == '0' ? '' : inputs.state_id}
                                headerTitle="Select City"
                                loading={cityLoad}
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
                    title={'ADD LEAD'}
                    onPress={addLead}
                    style={styles.button}
                    loading={false}
                />
            </ScrollView>

            <CountryPicker
                countryCode='IN'
                visible={true}
                onSelect={onSelectCountry}
                modalProps={{ visible: countryModal }}
                onClose={closeCountryModal}
                withFilter
                withCallingCode
                containerButtonStyle={styles.countrybuttonstyle}
            />
        </View>
    )
}

export default AddLead;