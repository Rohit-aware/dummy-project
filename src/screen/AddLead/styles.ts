import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentcontainer: {
        paddingTop: 20,
        // borderWidth: 1,
        flexGrow: 1,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    childcontainer: {
        flex: 0.47,
        marginHorizontal: 0,
    },

    button: {
        marginTop: 30,
    },
    countrybuttonstyle: {
        display: 'none',
    },
    linkContainer: {
        height: 90,
    },
    linkInput: {
        textAlignVertical: 'top',
        flex: 1,
        paddingVertical: 15,
    },
    placeholderStyle: { top: 15 },
});
export { styles }