import { StyleSheet } from "react-native";
import { Colors } from "../../constants";
import { fontStyles } from "../../styles";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        padding:12,
        borderWidth: 0.7,
        borderRadius: 8,
        borderColor: Colors.grey,
        marginVertical: 10,
    },
    heading: {
        marginLeft: 25,
        flex: 1,
        marginRight: 25,
        ...fontStyles.r7,
    },

    searchinputStyle: {
        marginRight: 0,
    },

    placeholder: {
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: -2,
    },
    text: {
        opacity: 0.5,
        zIndex: -1,
        marginRight: 5,
        flex: 1,
        ...fontStyles.r3,
    },
    star: {
        color: Colors.brown,
    },
    button: {
        height: 30,
        justifyContent: 'center',
        width: 25,
        alignItems: 'center',
    },
    modal: {
        margin: 0,
        // flex: 1,
        backgroundColor: Colors.white,
    },
    headerContainer: {
        height: 70,
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    back: {
        marginHorizontal: 15,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    wrapper: {
        paddingVertical: 13,
        paddingHorizontal: 20,
    },
    activeContainer: {
        backgroundColor: Colors.whiteGrey,
    },
    inactiveContainer: {
        backgroundColor: Colors.white,
    },
    displaykey: {
        ...fontStyles.r6,
        textTransform: 'capitalize',
    },
    dot: {
        left: 10,
    },
    emptyText: {
        color: Colors.blue,
        textAlign: 'center',
        marginHorizontal: 15,
        ...fontStyles.r6,
    },
    value: {
        letterSpacing: 1,
    },
});
export { styles }