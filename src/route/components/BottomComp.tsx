import React from 'react';
import { styles } from './styles';
import { Colors } from '../../constants';
import BottomBack from '../../../assets/icons/BottomBack';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Leads, Plus, Profile, Projects } from '../../../assets/icons';
import { FlatList, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useMyLeadStore, useMyProjectStore, useStartupStore } from '../../store';

type LabelIconProps = { index: number, isFocused: boolean }

const BottomComp = (props: BottomTabBarProps) => {
    const { state, navigation } = props;
    const { FilterLeads } = useMyLeadStore();
    const [showBottomTab, setShowBottTab] = React.useState(true);
    const { FilterProjects, enableProjectFilter } = useMyProjectStore();
    const {
        data: {
            screens: {
                bottom_nav:
                { home, leads, add_lead_icon, projects, profiles } = {}
            } = {},
            edit_allowed
        } = {},
        loading
    } = useStartupStore() || {};
    const addLead = edit_allowed && add_lead_icon;
    const isVisible = [home, leads, addLead, projects, profiles];

    const showtab = () => setShowBottTab(true);
    const hidetab = () => setShowBottTab(false);

    const handleTabPress = async (index: number, isFocused?: boolean) => {
        if (isFocused) return;
        if (index === 2) return;
        if (index === 1) {
            FilterLeads(null)
            navigation.navigate('MyLeads');
        };
        if (index === 3) {
            FilterProjects(null)
            enableProjectFilter({ project_status: null, client_id: null })
            navigation.navigate('MyProjects');
        }
        else { navigation.navigate(state.routeNames[index]); };
    };

    React.useEffect(() => {
        const keyDidShow = Keyboard.addListener('keyboardDidShow', hidetab);
        const keyDidHide = Keyboard.addListener('keyboardDidHide', showtab);
        return () => { keyDidHide.remove(); keyDidShow.remove(); };
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
            <BottomBack style={{ position: 'absolute', zIndex: 1, }} />
            <View style={styles.tabWrapper}>
                <FlatList
                    style={{ flex: 1 }}
                    data={state.routeNames}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.tabContainer}
                    renderItem={({ item, index }) => {
                        const isFocused = index === state.index;
                        return isVisible[index] ? (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleTabPress(index, isFocused)}
                                style={[styles.tab]}
                            >
                                <RenderIcon index={index} isFocused={isFocused} />
                                <RenderTabLabel index={index} isFocused={isFocused} />
                            </TouchableOpacity>
                        ) : <></>;
                    }}
                    keyExtractor={(_, index) => index.toString()}
                />
                <TouchableOpacity style={styles.plusBtn} onPress={() => {
                    navigation.navigate('AddLead');
                }}>
                    <Plus height={23} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BottomComp;