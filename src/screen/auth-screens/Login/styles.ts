import { StyleSheet } from "react-native";
import { fontStyles } from "../../../styles";
import { Colors, moderateScale } from "../../../constants";
import { SCREEN_WIDTH } from "../../../constants/dimenssion";

const LoginStyles = StyleSheet.create({
    heading: {
        ...fontStyles.r1,
    },
    hint: {
        opacity: 0.7,
        ...fontStyles.r3,
    },
    logo: {
        height: moderateScale(90),
        width: moderateScale(70),
        alignSelf: 'center',
        marginVertical: moderateScale(30),
    },
    topcontainer: {
        width: SCREEN_WIDTH,
        height: moderateScale(180),
        position: 'absolute',
        top: 0,
        right: moderateScale(-5),
    },
    rightimage: {
        position: 'absolute',
        right: moderateScale(0),
        top: -moderateScale(20),
    },

    bottomcontainer: {
        zIndex: -1,
        width: SCREEN_WIDTH,
        height: moderateScale(160),
        position: 'absolute',
        bottom: 0,
        left: -5,
        transform: [{ rotate: '180deg' }],
    },
    bottomimage: {
        position: 'absolute',
        right: 0,
        top: -20,
    },
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    forgotpass: {
        alignSelf: 'flex-end',
        color: Colors.lightblue,
        ...fontStyles.r3,
    },
    common: {
        textAlign: 'center',
        ...fontStyles.r3,
    },
    question: {
        color: Colors.lightblue,
    },
    register: {
        color: Colors.yellow,
    },
});

export { LoginStyles }