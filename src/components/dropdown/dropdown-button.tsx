import Picker from './dropdown-picker';
import React, { useState } from 'react';
import { fontStyles } from '../../styles';
import PlaceHolder from '../common/PlaceHolder';
import { DropdownButtonprops } from './interface';
import { DropDownIcon } from '../../../assets/icons';
import { Colors, moderateScale } from '../../constants';
import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

const DropdownButton = ({
    placeholder,
    value,
    star,
    onPress,
    wrapperStyle,
    name,
    data,
    onSelect,
    loading,
    disabled,
}: DropdownButtonprops) => {
    const [show, setShow] = useState(false);

    const openPicker = () => {
        onPress ? onPress() : setShow(true);
    };

    const closePicker = () => {
        setShow(false);
    };

    const handlePicker = () => loading ? null : show ? closePicker() : openPicker()
    const ITEM_HEIGHT = moderateScale(50);
    const MIN_HEIGHT = moderateScale(100);
    const MAX_HEIGHT = moderateScale(300);
    const dynamicHeight = Math.min(Math.max(data!?.length * ITEM_HEIGHT, MIN_HEIGHT), MAX_HEIGHT);

    return (
        <View style={[styles.wrapper, wrapperStyle]} onResponderStart={handlePicker}>
            <TouchableWithoutFeedback onPress={handlePicker} disabled={disabled}>
                <View style={styles.container}>
                    {value === '' ? (
                        <>
                            <PlaceHolder placeholder={placeholder} star={star!} />
                            <View style={styles.empty} />
                        </>
                    ) : (
                        <Text style={styles.text}>{value}</Text>
                    )}
                    <Pressable
                        disabled={disabled}
                        onPress={handlePicker}
                        style={[styles.button]}
                        android_ripple={{ color: Colors.blue, borderless: true, radius: 15 }}
                    >
                        <View style={show ? { transform: [{ rotate: '180deg' }] } : {}} onResponderStart={handlePicker}>
                            {loading ? <ActivityIndicator color={Colors.blue} /> : <DropDownIcon />}
                        </View>
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
            {show && (
                <View style={[styles.DropDownCon, { maxHeight: dynamicHeight ? dynamicHeight : 50, }]}>
                    <Picker
                        show={show}
                        close={closePicker}
                        name={name!}
                        data={data}
                        onSelect={onSelect}
                        value={value}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: moderateScale(15),
        marginVertical: moderateScale(10),
    },
    text: {
        zIndex: -1,
        marginRight: 5,
        flex: 1,
        ...fontStyles.r3,
        textTransform: 'capitalize',
    },
    container: {
        height: moderateScale(55),
        borderWidth: 0.7,
        borderRadius: moderateScale(8),
        borderColor: Colors.grey,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    button: {
        height: moderateScale(30),
        justifyContent: 'center',
        width: moderateScale(25),
        alignItems: 'center',
    },
    empty: {
        flex: 1,
    },
    DropDownCon: {
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderRadius: moderateScale(4),
        elevation: 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.thickGrey,
    },
});
export default DropdownButton;