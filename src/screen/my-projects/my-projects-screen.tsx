import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../constants';
import { Header, SearchBar } from '../../components';
import ProjectsList from './components/projects-list';
import { useMyProjectHook } from './my-project-hook';

const MyProjects = () => {

    const {
        project_status,
        isProjectFilter,
        search,
        data,
        onFilter,
        setSearch,
        page,
        isFinish,
        projectLoad,
        refresh,
        onEndReached,
        onRefresh
    } = useMyProjectHook();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title={'My Projects'} />
            <SearchBar
                onPress={onFilter}
                onChangeText={setSearch}
                value={search}
                enabled={
                    project_status == 'Projects'
                        ? false
                        : project_status != null || isProjectFilter !== ''
                            ? true
                            : false
                }
            />
            <ProjectsList
                data={data}
                finish={isFinish}
                loading={projectLoad}
                refresh={refresh}
                onEndReached={onEndReached}
                page={page}
                onRefresh={onRefresh}
            />
        </View>
    )
};

export default MyProjects;