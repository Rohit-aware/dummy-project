import React from 'react';
import Modal from 'react-native-modal';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { Dots } from '../../../../assets/icons';
import { useProfileStore } from '../../../store';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
interface YearsModalType {
    selectedyear: string;
    isVisible: boolean;
    close: () => void;
    changeYear: (item: string) => void;
}

const YearsModal = ({ selectedyear, isVisible, close, changeYear }: YearsModalType) => {
    const { years } = useProfileStore();
    const changeBackground = (new_year: any) => {
        return {
            backgroundColor: new_year == selectedyear ? Colors.whiteGrey : Colors.white,
        };
    };
    return (
        <Modal
            isVisible={isVisible}
            style={styles.modal}
            onBackButtonPress={close}
            onBackdropPress={close}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}>
            <View style={styles.wrapper}>
                <ScrollView>
                    {years.map((item, index) => {
                        let new_year = '';
                        let target = '';

                        for (let i in item) {
                            new_year = i;
                            target = item[i];
                        }

                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.container, changeBackground(new_year)]}
                                onPress={() => changeYear(new_year)}>
                                <Text style={styles.display_year}>{new_year}</Text>
                                <Dots style={styles.dots} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width: 300,
        backgroundColor: Colors.white,
    },
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    display_year: {
        ...fontStyles.r6,
    },
    dots: {
        marginHorizontal: 20,
    },
});
export default YearsModal;