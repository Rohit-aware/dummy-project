import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants';

const BottomLoader = ({ containerStyle, color, size }: { containerStyle?: ViewStyle, color?: string, size?: number }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <ActivityIndicator
                color={color ? color : Colors.blue}
                size={size ? size : 'large'}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
});
export default BottomLoader;