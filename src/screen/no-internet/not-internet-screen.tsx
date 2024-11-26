import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { commonStyles } from '../../styles';
import { NoInternet } from '../../../assets/icons';
import fontStyles from '../../styles/font-styles';
import { View, Text, StyleSheet } from 'react-native';
import { useNetwork } from '../../context/network-context';
import moderateScale, { SCREEN_HEIGHT } from '../../constants/dimenssion';


const NoInternetScreen = () => {
    const { isConnected } = useNetwork();
    return (
        <Modal
            useNativeDriver={true}
            animationOut={'bounceOutDown'}
            animationOutTiming={1200}
            useNativeDriverForBackdrop
            collapsable
            avoidKeyboard
            hardwareAccelerated
            style={{
                flex: 1,
                margin: 0,
                height: SCREEN_HEIGHT
            }}
            animationIn={'slideInUp'}
            isVisible={isConnected}>
            <View style={styles.noInternetView}>
                <NoInternet/>
                <View style={{ justifyContent: 'center', alignItems: 'center', rowGap: 10 }}>
                    <Text style={styles.noInternetText}>{"Oops!"}</Text>
                    <Text style={styles.noInternetSubTxt}>{'No Connection Found'}</Text>
                    <Text style={styles.noInternetSubTxt}>{'Please Check Connection'} </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    noInternetView: {
        ...commonStyles._flexOneBg(Colors.white),
        ...commonStyles.centerJCAC,
        gap: moderateScale(30),
        height: SCREEN_HEIGHT,
    },
    noInternetText: {
        ...fontStyles.p1,
        color:'#7E7B71'
    },
    noInternetSubTxt: {
        ...fontStyles.r7,
        color:'#9E9E9E'
    }
});

export default NoInternetScreen;