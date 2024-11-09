import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, KeyboardType } from 'react-native';
import PlaceHolder from './PlaceHolder';
import { Colors } from '../../constants';
import { fontStyles } from '../../styles';

interface NumberInputProps {
    editable?: boolean;
    maxLength?: number;
    secureTextEntry?: boolean;
    placeholder: string;
    star: boolean;
    value?: string;
    onChangeText: (name: string, text: string) => void;
    name?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    keyboardType?: KeyboardType;
    countrycode?: string;
    onPressCode?: () => void;
}

const NumberInput = ({
    editable,
    maxLength,
    secureTextEntry,
    placeholder,
    star,
    value,
    onChangeText,
    name,
    onFocus,
    onBlur,
    keyboardType,
    countrycode,
    onPressCode
}: NumberInputProps) => {
    const [empty, setEmpty] = useState(true);

    const checkForEmpty = () => {
        const isEmpty = empty && (value == '' || value == undefined) ? true : false;
        return isEmpty;
    };

    const onInputFocus = () => {
        setEmpty(false);
    };

    const onInputBlur = () => {
        checkForEmpty() ? setEmpty(false) : setEmpty(true);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.countryCode} onPress={onPressCode}>
                {`+${countrycode}`}
            </Text>
            <View style={styles.pipe} />
            <TextInput
                style={[styles.textinput]}
                editable={editable}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onChangeText={text => onChangeText(name!, text)}
                value={value}
                keyboardType={keyboardType ? keyboardType : 'numeric'}
            />

            {checkForEmpty() && <PlaceHolder placeholder={placeholder} star={star} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        justifyContent: 'center',
        height: 55,
        borderWidth: 0.7,
        borderRadius: 10,
        borderColor: Colors.grey,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textinput: {
        color: Colors.black,
        paddingHorizontal: 15,
        ...fontStyles.r3,
        flex: 1,
    },
    countryCode: {
        ...fontStyles.r3,
        zIndex: -1,
        paddingHorizontal: 10,
        width: 75,
        textAlign: 'center',
        // borderWidth:1
    },
    pipe: {
        borderWidth: 0.5,
        borderColor: Colors.grey,
        height: '50%',
        opacity: 0.5,
        // marginHorizontal: 20,
    },

});
export default NumberInput;