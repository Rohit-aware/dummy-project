import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../constants';
import { Header, Loader, SearchBar } from '../../components';
import ProjectsList from './components/projects-list';
import { useMyProjectHook } from './my-project-hook';

const MyProjects = () => {

    const {
        page,
        data,
        search,
        reload,
        refresh,
        isFinish,
        onFilter,
        setSearch,
        onRefresh,
        projectLoad,
        onEndReached,
        fetchProjects,
        project_status,
        isProjectFilter,
        setMyProjectPage,
    } = useMyProjectHook();


    React.useEffect(() => {
        setMyProjectPage({ projectPage: 0 });
        fetchProjects({ page: 0 });

        const timeoutId = setTimeout(() => {
            setMyProjectPage({ projectPage: 1 });
        }, 1000);

        // return () => clearTimeout(timeoutId);
    }, [reload]);


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