import { StyleSheet } from "react-native";
import { Colors } from "../../../constants";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingTop: 20,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    rightcontainer: {
        flex: 0.47,
        marginHorizontal: 0,
    },
    leftcontainer: {
        flex: 0.47,
        marginHorizontal: 0,
    },
    btncontainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
export { styles }