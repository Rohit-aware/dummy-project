import React from "react";
import { Colors } from "../../constants";
import { View, ActivityIndicator, ViewStyle } from "react-native";

const Loader = ({ style, color, size }: { style?: ViewStyle, color?: string, size?: number }) => {
    return (
        <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, style]}>
            <ActivityIndicator color={color ? color : Colors.blue} size={size ? size : "large"} />
        </View>
    )
}

export default Loader