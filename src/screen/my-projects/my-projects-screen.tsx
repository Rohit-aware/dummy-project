import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../constants';
import { useMyProjectHook } from './my-project-hook';
import { Header, SearchBar } from '../../components';
import ProjectsList from './components/projects-list';

const MyProjects = () => {

    const {
        page,
        data,
        search,
        refresh,
        isFinish,
        onFilter,
        setSearch,
        onRefresh,
        projectLoad,
        onEndReached,
        project_status,
        isProjectFilter,
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
                        : project_status != null
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