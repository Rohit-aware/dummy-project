import React, { } from "react"
import { Colors } from "../../constants"
import { fontStyles } from "../../styles"
import { Filter } from "../../../assets/icons"
import { View, StyleSheet, Pressable, TextInput, Image, TouchableWithoutFeedback, Keyboard, ViewStyle, TextStyle } from "react-native";

type SearchBarProps = {
    searchStyle?: ViewStyle;
    hide?: boolean;
    textinputStyle?: TextStyle;
    onPress: () => void;
    onChangeText: (text: string) => void;
    value: string;
    enabled?: boolean;
}

const SearchBar = ({ searchStyle, hide, textinputStyle, onPress, onChangeText, value, enabled }: SearchBarProps) => {



    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={[styles.container, searchStyle]}>
                {/* <Filter /> */}
                <View style={[styles.textinput, textinputStyle]} >
                    <TextInput
                        style={[{ paddingHorizontal: 10, zIndex: 10, color: Colors.black }, fontStyles.r2,]}
                        placeholder="Search here…"
                        placeholderTextColor={Colors.grey}
                        onChangeText={(text) => onChangeText ? onChangeText(text) : null}
                        value={value}
                    />
                </View>
                {
                    hide ? null :
                        <Pressable style={{ width: 30, height: 30, justifyContent: "center", alignItems: "center", zIndex: 10 }} android_ripple={{ color: Colors.lightblue, borderless: true, radius: 20 }} onPress={onPress}>
                            {/* <Filter /> */}
                            {
                                enabled ?
                                    <Image source={require("../../../assets/images/filterActive.png")} style={{ width: 28, height: 28 }} resizeMode="contain" />
                                    :
                                    <Filter height={23} />

                            }
                        </Pressable>
                }

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 15,
        marginVertical: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
    textinput: {
        flex: 1,
        marginRight: 30,
        height: 48,
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        borderRadius: 7,
        paddingHorizontal: 7,
        justifyContent: "center"

    }
})

export default SearchBar