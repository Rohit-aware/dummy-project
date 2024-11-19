import React from 'react';
import { Colors } from '../../../constants';
import { View, StyleSheet } from 'react-native';
import EmployeesList from './components/employees-list';
import { useShareProjectHook } from './share-project-hook';
import { Button, Header, SearchBar } from '../../../components';


const ShareProject = () => {

    const {
        teams,
        search,
        onCheck,
        refresh,
        loading,
        btnload,
        teamPage,
        onRefresh,
        setSearch,
        onEndReached,
        shareProjects,
    } = useShareProjectHook();

    return (
        <View style={styles.root}>
            <Header title={'Share Projects'} />
            <SearchBar
                hide
                textinputStyle={styles.searchinput}
                onChangeText={setSearch}
                value={search}
            />
            <EmployeesList
                data={teams}
                loading={loading}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
                page={teamPage}
                refresh={refresh}
                onCheck={onCheck}
            />
            {teams.length > 0 && (
                <Button onPress={shareProjects} title="Share Project" loading={btnload} />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    searchinput: {
        marginRight: 0,
    },
});
export default ShareProject;
