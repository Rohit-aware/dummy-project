import React from 'react';
import Pdf from 'react-native-pdf';
import { Colors } from '../../constants';
import { Header, Loader } from '../../components';
import { MainStackProps } from '../../router/interface';
import { View, StyleSheet, Animated } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const FileViewer = () => {
    const { params: { data } } = useRoute<RouteProp<MainStackProps, 'FileViewer'>>();
    const [loading, setloading] = React.useState(false);
    const pinch = React.useRef();
    const scale = new Animated.Value(1);
    console.log(data)
    const handlePinch = Animated.event([{ nativeEvent: { scale: scale } }], {
        useNativeDriver: true,
    });

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title={data.filename} />
            {data?.filePath?.split('.')?.pop() === 'pdf' ? (
                <Pdf
                    trustAllCerts={false}
                    source={{ uri: data.filePath }}
                    onError={(error: any) => { }}
                    style={styles.pdf}
                />
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 40,
                    }}>
                    <PinchGestureHandler
                        ref={pinch}
                        onGestureEvent={handlePinch}
                        onHandlerStateChange={e => {
                            if (e.nativeEvent.oldState == State.ACTIVE) {
                                Animated.timing(scale, {
                                    toValue: 1,
                                    useNativeDriver: true,
                                }).start();
                            }
                        }}>
                        <Animated.Image
                            source={{ uri: data.filePath }}
                            style={{
                                height: undefined,
                                width: undefined,
                                aspectRatio: 0.8,
                                flex: 0.7,
                                transform: [{ scale }],
                            }}
                            resizeMode="contain"
                            onLoadStart={() => {
                                setloading(true);
                            }}
                            onLoadEnd={() => {
                                setloading(false);
                            }}
                        />
                    </PinchGestureHandler>
                    {loading ? <Loader /> : null}
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    pdf: {
        flex: 1,
    },
});
export default FileViewer;
