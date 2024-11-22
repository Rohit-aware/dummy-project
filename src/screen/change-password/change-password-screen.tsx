import React from 'react';
import { Colors } from '../../constants';
import { Button, Header, InputBox } from '../../components';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useChangePasswordHook } from './change-password-hook';

const ChangePassword = () => {
    
    const {
        inputs,
        loading,
        onUpdate,
        onChangeText,
    } = useChangePasswordHook();

    return (
        <View style={styles.root}>
            <Header title={'Change Password'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.contentContainerStyle}>
                <InputBox
                    placeholder={'Old Password'}
                    star
                    onChangeText={onChangeText}
                    name={'old_password'}
                    value={inputs.old_password}
                    secureTextEntry
                />
                <InputBox
                    placeholder={'New Password'}
                    star
                    onChangeText={onChangeText}
                    name={'new_password'}
                    value={inputs.new_password}
                    secureTextEntry
                />
                <InputBox
                    placeholder={'Confirm Password'}
                    star
                    onChangeText={onChangeText}
                    name={'confirm_password'}
                    value={inputs.confirm_password}
                    secureTextEntry
                />
                <View style={styles.container}>
                    <Button title={'UPDATE'} onPress={onUpdate} loading={loading} />
                </View>
            </ScrollView>
        </View>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
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
