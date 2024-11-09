import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native"
import { Colors } from "../../constants"
import { Back } from "../../../assets/icons"
import { fontStyles } from "../../styles"

const Header = ({ title }: { title: string }) => {
    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Pressable
                    style={styles.back}
                    android_ripple={{ color: Colors.lightblue, borderless: true, radius: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <Back />
                </Pressable>
                <Text numberOfLines={1} ellipsizeMode="tail" style={[fontStyles.r7, { marginLeft: 25, flex: 1, marginRight: 25 }]}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    back: {
        marginHorizontal: 15,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10
    }
})

export default Header;