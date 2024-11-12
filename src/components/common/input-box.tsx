import React from 'react';
import { PlaceHolder } from '..';
import { fontStyles } from '../../styles';
import { Colors, moderateScale } from '../../constants';
import { View, StyleSheet, TextInput, KeyboardType, ViewStyle, TextStyle } from 'react-native';

interface InputBoxProps {
    name: string;
    star?: boolean;
    value: string;
    editable?: boolean;
    maxLength?: number;
    placeholder: string;
    multiLine?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    secureTextEntry?: boolean;
    containerStyle?: ViewStyle;
    textinputStyle?: TextStyle;
    keyboardType?: KeyboardType;
    placeholderStyle?: TextStyle;
    onChangeText: (name: string, value: string) => void;
};

const InputBox: React.FC<InputBoxProps> = ({
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
    containerStyle,
    textinputStyle,
    multiLine,
    placeholderStyle,
}): JSX.Element => {
    const [empty, setEmpty] = React.useState(true);

    const checkForEmpty = () => {
        const isEmpty = empty && (value == '' || value == undefined) ? true : false;
        return isEmpty;
    };

    const onInputFocus = () => {
        setEmpty(false);
        onFocus && onFocus();
    };

    const onInputBlur = () => {
        checkForEmpty() ? setEmpty(false) : setEmpty(true);
        onBlur && onBlur();
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={[styles.textinput, textinputStyle]}
                editable={editable}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onChangeText={value => onChangeText(name, value)}
                value={value}
                keyboardType={keyboardType ? keyboardType : 'default'}
                multiline={multiLine}
            />
            {checkForEmpty() && <PlaceHolder placeholder={placeholder} star={star!} placeholderStyle={placeholderStyle!} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: moderateScale(55),
        borderWidth: moderateScale(0.7),
        borderRadius: moderateScale(10),
        borderColor: Colors.grey,
        marginVertical: moderateScale(10),
        alignSelf: 'center',
        width: '92%'
    },
    textinput: {
        color: Colors.black,
        paddingHorizontal: moderateScale(15),
        ...fontStyles.r3,
    },
});
export default InputBox;