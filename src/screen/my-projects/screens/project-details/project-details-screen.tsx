import React from 'react';
import { fontStyles } from '../../../../styles';
import ListHeader from './components/list-header';
import { useProjectDetailsHook } from './project-detail-hook';
import { Colors, moderateScale } from '../../../../constants';
import RenderActivityList from './components/activities-list';
import RenderUpcActivityList from './components/upcoming-list';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { BottomLoader, Header, Loader } from '../../../../components';
import NoUpcomingActivities from '../../../../../assets/images/NoupcomingActvities';

const ProjectDetails = () => {

    const {
        open,
        active,
        setActive,
        onViewTeam,
        activities,
        activityLoad,
        activityPage,
        onEndActivity,
        upcActivities,
        upcActivityLoad,
        upcActivityPage,
        onEndUpcActivity,
    } = useProjectDetailsHook();

    const EmptyComp = React.useCallback(({ text }: { text: string }) => (
        <View style={styles.emptycontainer}>
            <NoUpcomingActivities width={110} height={110} />
            <Text style={styles.emptytext}>{text}</Text>
        </View>
    ), []);

    const _renderProjectDetails_ = () => {
        return (
            <>
                {active == 'Activities' ?
                    (activityLoad && activityPage === 0) ?
                        <Loader />
                        :
                        <FlatList
                            data={activities}
                            onEndReachedThreshold={0.5}
                            onEndReached={onEndActivity}
                            ListEmptyComponent={() => {
                                return !upcActivityLoad ? (
                                    <EmptyComp text='There are no activities' />
                                ) : null;
                            }}
                            ListFooterComponent={() => activityLoad && activityPage !== 0 ? <BottomLoader /> : null}
                            renderItem={({ item, index }) => <RenderActivityList {...{ item, index }} />}
                        />
                    :
                    (upcActivityLoad && upcActivityPage === 0) ?
                        <Loader />
                        :
                        <FlatList
                            data={upcActivities}
                            onEndReachedThreshold={0.5}
                            onEndReached={onEndUpcActivity}
                            ListEmptyComponent={() => {
                                return !upcActivityLoad ? (
                                    <EmptyComp text='no upcoming activities' />
                                ) : null;
                            }}
                            ListFooterComponent={() => upcActivityLoad && upcActivityPage !== 0 ? <BottomLoader /> : null}
                            renderItem={({ item, index }) => <RenderUpcActivityList {...{ item, index }} />}
                        />
                }
            </>
        )
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title="Project Details" />
            <FlatList
                data={[1]}
                ListHeaderComponent={() => (
                    <ListHeader
                        active={active}
                        setActive={setActive}
                        open={open}
                        onViewTeam={onViewTeam}
                    />
                )}
                renderItem={_renderProjectDetails_}
                contentContainerStyle={{ paddingVertical: moderateScale(15) }}
            />
        </View>
    )
}

export default ProjectDetails;

const styles = StyleSheet.create({
    emptycontainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    emptytext: {
        ...fontStyles.r3,
        marginTop: 20,
        textTransform: 'capitalize',
    },
});