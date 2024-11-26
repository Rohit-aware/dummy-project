import React from 'react';
import { fontStyles } from '../../../../styles';
import ListHeader from './components/list-header';
import ActionsModal from './components/actions-modal';
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
        show,
        close,
        active,
        refresh,
        onRefresh,
        setActive,
        actionData,
        onViewTeam,
        activities,
        activityLoad,
        activityPage,
        onEndActivity,
        upcActivities,
        project_detail,
        upcActivityLoad,
        upcActivityPage,
        onEndUpcActivity,
    } = useProjectDetailsHook();
    let len = activities?.length


    const EmptyComp = React.useCallback(({ text }: { text: string }) => (
        <View style={styles.emptycontainer}>
            <NoUpcomingActivities width={110} height={110} />
            <Text style={styles.emptytext}>{text}</Text>
        </View>
    ), []);

    const _renderProjectDetails_ = React.useCallback(() => {
        return (project_detail?.activity || project_detail?.upcoming_activity) ? (
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
                            renderItem={({ item, index }) => <RenderActivityList {...{ item, index, len }} />}
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
            :
            <></>
    }, [
        project_detail,
        active,
        activityLoad,
        upcActivityLoad,
        activityPage,
        upcActivityPage,
        activities,
        upcActivities,
        onEndActivity,
        onEndUpcActivity,
    ]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title="Project Details" />
            <FlatList
                data={[1]}
                onRefresh={onRefresh}
                refreshing={refresh}
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
            <ActionsModal
                show={show}
                details={actionData}
                close={close}
                hideleadbutton={actionData?.is_share_lead == 'Y' ? false : true}
                hideProjectbutton={actionData?.is_update_status == 'Y' ? false : true}
            />
        </View>
    )
}

export default ProjectDetails;

const styles = StyleSheet.create({
    emptycontainer: {
        alignItems: 'center',
        marginVertical: moderateScale(30),
    },
    emptytext: {
        ...fontStyles.r3,
        marginTop: moderateScale(20),
        textTransform: 'capitalize',
    },
});
