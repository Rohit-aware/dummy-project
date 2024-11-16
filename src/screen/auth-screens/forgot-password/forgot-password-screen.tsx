import React from 'react';
import color from '../../../constants/colors';
import { View, StyleSheet,  ScrollView } from 'react-native';
import { Header, Button, InputBox } from '../../../components';
import { useForgotPasswordHook } from './forgot-password-hook';

const ForgotPassword = () => {
    const {
        onChangeText,
        email,
        onProceed,
        loading,
    } = useForgotPasswordHook()

    return (
        <View style={styles.root}>
            <Header title={'Forgot password'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
                keyboardShouldPersistTaps={'handled'}>
                <InputBox
                    placeholder={'Offical Email ID'}
                    star
                    onChangeText={onChangeText}
                    name={'email'}
                    value={email}
                />
                <View style={styles.container}>
                    <Button title={'PROCEED'} onPress={onProceed} loading={loading} />
                </View>
            </ScrollView>
        </View>

    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: color.white,
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingTop: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
