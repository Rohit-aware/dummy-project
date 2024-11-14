import React from 'react';
import Title from './components/title';
import Boxes from './components/boxes';
import { Colors } from '../../constants';
import { Header } from '../../components';
import LeadInfo from './components/lead-info';
import { ScrollView, StyleSheet, View } from 'react-native';
import BottomButtons from './components/BottomButtons';

const LeadDetail = () => {

    return (
        <View style={{ flex: 1,backgroundColor:Colors.white }}>
            <Header title={'Lead Details'} />
            <ScrollView
                style={styles.wrapper}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}>
                <Title />
                <Boxes />
                <LeadInfo />
                <BottomButtons />
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainerStyle: {
        paddingBottom: 20,
    },
    wrapper: {
        marginHorizontal: 15,
    },
});
export default LeadDetail;