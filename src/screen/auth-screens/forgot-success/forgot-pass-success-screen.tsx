import React from 'react';
import { Button } from '../../../components';
import { fontStyles } from '../../../styles';
import { EmailSvg } from '../../../../assets/icons';
import { Colors, moderateScale } from '../../../constants';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const ForgotPassSuccess = ({ route, navigation }: any) => {
    const { message } = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white,paddingHorizontal:moderateScale(16) }}>
            <View style={styles.emailCont}>
                <EmailSvg />
                <Text style={[styles.resetPassText]}>Reset Password Link Sent</Text>
                <Text style={[styles.messageTxt]}>{message}</Text>

            </View >
            <Button
                title={'Go To Login'}
                style={{ width: width * 0.9 }}
                onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); }}
                textStyle={undefined} loading={undefined} hide={undefined} />
        </View>
    )
};

export default ForgotPassSuccess;
const styles = StyleSheet.create({
    emailCont: { flex: 1, alignItems: 'center', justifyContent: 'center', rowGap: moderateScale(10) },
    resetPassText: { ...fontStyles.p1, fontSize: 20, paddingVertical: moderateScale(10) },
    messageTxt: { ...fontStyles.r14, fontSize: 14, textAlign: 'center' }
});