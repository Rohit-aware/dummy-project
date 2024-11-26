import React from 'react';
import { useHome } from './home.hook';
import { Loader } from '../../components';
import { FlatList, View } from 'react-native';
import { Colors, moderateScale } from '../../constants';
import { Header, NavigatorButton, ProjectsBox, VersionDetail } from './components';
import { useStartupStore } from '../../store';

const Home = () => {

    const { data: { screens: { home } = {} } = {}, loading: startupLoad } = useStartupStore();
    const { projects_followup, today_activities, today_reminders, today_follow_ups } = home || {};

    const {
        data,
        refresh,
        loading,
        onRefresh,
        onNavigator,
        fetchHomeData,
        fetchOutsiders,
        fetchmaster_data,
        resetIsFinishPage,
    } = useHome();

    React.useEffect(() => {
        fetchHomeData();
        fetchOutsiders();
        fetchmaster_data();
    }, [])

    const _renderHome_ = () => {
        return (
            <View>
                <Header />
                {projects_followup &&
                    <ProjectsBox
                        discussion={data?.ProjectsUnderDiscussion}
                        converted={data?.ProjectsConverted}
                    />
                }
                {today_activities &&
                    <NavigatorButton
                        title={'Today’s Activities'}
                        value={data?.activitiesToday}
                        onPress={() => {
                            resetIsFinishPage();
                            onNavigator('Activities');
                        }}
                    />
                }
                {today_reminders &&
                    <NavigatorButton
                        title={'Today’s Reminders'}
                        value={data?.remindersToday}
                        onPress={() => onNavigator('Reminders')}
                    />
                }
                {today_follow_ups &&
                    <NavigatorButton
                        title={"Today's Follow-ups"}
                        value={data?.followupsToday}
                        onPress={() => onNavigator('FollowUpToday')}
                    />
                }
                <VersionDetail />
            </View>
        )
    };

    if (loading || startupLoad) return <Loader style={{ backgroundColor: Colors.white }} />

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <FlatList
                data={[1]}
                refreshing={refresh}
                onRefresh={onRefresh}
                renderItem={_renderHome_}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: moderateScale(10) }}
            />
        </View>
    )
}

export default Home;