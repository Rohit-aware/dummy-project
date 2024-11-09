import React from 'react';
import { useHome } from './home.hook';
import { Loader } from '../../components';
import { FlatList, View } from 'react-native';
import { Colors, moderateScale } from '../../constants';
import { Header, NavigatorButton, ProjectsBox, VersionDetail } from './components';

const Home = () => {
    const {
        data,
        loading,
        onNavigator,
        fetchHomeData,
    } = useHome();

    React.useEffect(() => {
        fetchHomeData();
    }, [])

    const _renderHome_ = () => {
        return (
            <View>
                <Header />
                <ProjectsBox
                    discussion={data?.ProjectsUnderDiscussion}
                    converted={data?.ProjectsConverted}
                />
                <NavigatorButton
                    title={'Today’s Activities'}
                    value={data?.activitiesToday}
                    onPress={() => {
                        onNavigator('Activities');
                    }}
                />
                <NavigatorButton
                    title={'Today’s Reminders'}
                    value={data?.remindersToday}
                    onPress={() => onNavigator('Reminders')}
                />
                <NavigatorButton
                    title={"Today's Follow-ups"}
                    value={data?.followupsToday}
                    onPress={() => onNavigator('FollowUpToday')}
                />
                <VersionDetail />
            </View>
        )
    };

    if (loading) return <Loader style={{ backgroundColor: Colors.white }} />

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={[1]}
                renderItem={_renderHome_}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: moderateScale(10) }}
            />
        </View>
    )
}

export default Home;