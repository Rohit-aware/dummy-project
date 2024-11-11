import React from 'react';
import { useLogin } from './login.hook';
import { Moon } from '../../../../assets/icons';
import FastImage from 'react-native-fast-image';
import { LoginStyles as styles } from './styles';
import { moderateScale } from '../../../constants';
import { View, Text, ImageBackground } from 'react-native';
import { Button, InputBox, TakeSpace } from '../../../components';




const LOGO = require('../../../../assets/images/logo.png');
const CORNER_IMG = require('../../../../assets/images/curves.png');


const Greet = () => {
    return (
        <>
            <TakeSpace space={30} />
            <Text style={styles.heading}>{'Welcome !!'}</Text>
            <Text style={styles.hint}>
                {'Sign in to your account and get Started'}
            </Text>
            <FastImage source={LOGO} style={styles.logo} resizeMode="stretch" />
        </>
    );
};

const BackGround = () => {
    return (
        <>
            <ImageBackground
                source={CORNER_IMG}
                style={styles.topcontainer}
                resizeMode="cover">
                <View style={styles.rightimage}>
                    <Moon />
                </View>
            </ImageBackground>
            <ImageBackground
                source={CORNER_IMG}
                style={styles.bottomcontainer}
                resizeMode="cover">
                <View style={styles.bottomimage}>
                    <Moon />
                </View>
            </ImageBackground>
        </>
    )
}



const Login = () => {

    const {
        loader,
        inputs,
        doLogin,
        onForgot,
        onRegister,
        onChangeText,
    } = useLogin();

    return (
        <View style={{ flex: 1, paddingHorizontal: moderateScale(16) }}>
            <BackGround />
            <Greet />
            <InputBox
                name={'email'}
                star
                value={inputs.email}
                onChangeText={onChangeText}
                placeholder={'Official Email ID'}
                containerStyle={{ width: '100%' }}
            />
            <InputBox
                name={'password'}
                star
                value={inputs.password}
                onChangeText={onChangeText}
                placeholder={'Password'}
                secureTextEntry
                containerStyle={{ width: '100%' }}
            />
            <Text style={styles.forgotpass} onPress={onForgot}>
                {'Forget Password ?'}
            </Text>
            <Button title={'Login'} onPress={doLogin} loading={loader} />
            <Text style={styles.common}>
                <Text style={styles.question}>{'Don’t have an Account? '}</Text>
                <Text style={styles.register} onPress={onRegister}>
                    {'Register'}
                </Text>
            </Text>
        </View>
    )
}

export default Login;