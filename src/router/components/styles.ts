import { StyleSheet } from "react-native";
import { Colors, moderateScale } from "../../constants";
import { SCREEN_HEIGHT } from "../../constants/dimenssion";

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT * 0.09,
        backgroundColor: "white",
        paddingVertical: moderateScale(6)
    },
    tabWrapper: {
        flex: 1,
        paddingTop: moderateScale(4),
        zIndex: 999,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(2),
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: moderateScale(2),
        paddingLeft: moderateScale(2)
    },
    plusBtn: {
        position: 'absolute',
        bottom: moderateScale(27),
        left: '48.8%',
        transform: [{ translateX: moderateScale(-25) }],
        width: moderateScale(60),
        height: moderateScale(60),
        backgroundColor: Colors.blue,
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { styles };