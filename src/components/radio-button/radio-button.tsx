import React, { } from "react"
import { View, Text, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

const RadioButton = () => {
    return (
        <View style={styles.outer}>
            <View style={styles.inner} />
        </View>
    )
}

const styles = StyleSheet.create({
    outer: {
        width: 35,
        height: 35,
        backgroundColor: Colors.white,
        borderRadius: 35 / 2,
        borderWidth: 1,
        borderColor: Colors.blue,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    inner: {
        width: 25,
        height: 25,
        backgroundColor: Colors.blue,
        borderRadius: 25 / 2,
    }
})

export default RadioButton