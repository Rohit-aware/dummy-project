import React from 'react';
import { Colors, moderateScale } from '../../constants';
import BottomBack from '../../../assets/icons/BottomBack';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Leads, Plus, Profile, Projects } from '../../../assets/icons';
import { Dimensions, FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type LabelIconProps = { index: number, isFocused: boolean }
const { height: SCREEN_HEIGHT } = Dimensions.get('screen')

const BottomComp = (props: BottomTabBarProps) => {
    const { state, navigation } = props;
    const route = state.routes[state.index].name;
    const [showBottomTab, setShowBottTab] = React.useState(true);
    const showtab = () => setShowBottTab(true);
    const hidetab = () => setShowBottTab(false);

    const handleTabPress = async (index: number) => {
        if (index === 1) {
            navigation.navigate('MyLeads');
        };
        if (index === 2) return;
        if (index === 3) {
            navigation.navigate('MyProjects');
        } else {
            navigation.navigate(state.routeNames[index]);
        };
    };

    React.useEffect(() => {
        const keyDidShow = Keyboard.addListener('keyboardDidShow', hidetab);
        const keyDidHide = Keyboard.addListener('keyboardDidHide', showtab);
        return () => { keyDidHide.remove(); keyDidShow.remove() };
    }, []);

    const RenderIcon = React.memo(({ index, isFocused }: LabelIconProps) => {
        const colors = isFocused ? Colors.yellow : Colors.lightblue;
        switch (index) {
            case 0: return <Home color={colors} />;
            case 1: return <Leads color={colors} />;
            case 2: return null;
            case 3: return <Projects color={colors} />;
            case 4: return <Profile color={colors} />;
            default: return null;
        }
    });

    const RenderTabLabel = ({ index, isFocused }: LabelIconProps) => {
        const labels = ["Home", "Leads", '', "Projects", "Profile"];
        return (
            <Text style={[{ color: isFocused ? Colors.yellow : Colors.lightblue }]}>
                {labels[index]}
            </Text>
        );
    };

    return showBottomTab && (
        <View style={[styles.container]}>
            {true && <BottomBack style={{ position: 'absolute', zIndex: -1, }} />}
            <View style={styles.tabWrapper}>
                <FlatList
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.tabContainer}
                    data={state.routeNames}
                    renderItem={({ item, index }) => {
                        const isFocused = index === state.index;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleTabPress(index)}
                                style={[styles.tab]}
                            >
                                <RenderIcon index={index} isFocused={isFocused} />
                                <RenderTabLabel index={index} isFocused={isFocused} />
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(_, index) => index.toString()}
                />
                {true &&
                    <TouchableOpacity style={styles.plusBtn} onPress={() => {
                        navigation.navigate('AddLead', { operation: 'createLead' });
                    }}>
                        <Plus height={23} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default BottomComp;

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT * 0.09,
        backgroundColor: "white",
        paddingVertical: moderateScale(6)
    },
    tabWrapper: {
        flex: 1,
        paddingTop: moderateScale(4),
        zIndex: 999,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(2),
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: moderateScale(2),
        paddingLeft: moderateScale(2)
    },
    plusBtn: {
        position: 'absolute',
        bottom: moderateScale(27),
        left: '48.8%',
        transform: [{ translateX: moderateScale(-25) }],
        width: moderateScale(60),
        height: moderateScale(60),
        backgroundColor: Colors.blue,
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
