import React from "react"
import { Colors } from "../../constants";
import { fontStyles } from "../../styles";
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from "react-native"

type UploadInputType = {
    placeholder: string
    containerStyle?: ViewStyle
    textStyle?: TextStyle
    onPress: () => void
}

const UploadInput = ({
    placeholder,
    containerStyle,
    textStyle,
    onPress
}: UploadInputType) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
            <Text style={[styles.text, fontStyles.r3, textStyle]} numberOfLines={1} ellipsizeMode="tail" >
                {placeholder}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        justifyContent: "center",
        height: 60,
        borderWidth: 0.7,
        borderRadius: 15,
        borderColor: Colors.grey,
        marginVertical: 10,
        alignItems: "center"
    },
    text: {
        opacity: .7,
        zIndex: -1,
        letterSpacing: 1
    }
})

export default UploadInput