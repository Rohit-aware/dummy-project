import React from 'react';
import { fontStyles } from '../../styles';
import { View, StyleSheet, Text, Image } from 'react-native';

const ListEmptyComponent = ({
    containerStyle,
    image,
    imageprops,
    imageStyle,
    title,
    titleStyle,
}: any) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Image
                source={image}
                style={[styles.image, imageStyle]}
                {...imageprops}
                resizeMode="contain"
            />
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: undefined,
        aspectRatio: 1,
    },
    title: {
        marginTop: 25,
        ...fontStyles.r3,
        textTransform: "capitalize"
    },
});
export default ListEmptyComponent;