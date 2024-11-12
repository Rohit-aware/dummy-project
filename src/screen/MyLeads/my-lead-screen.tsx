import React from 'react';
import { View } from 'react-native';
import LeadsList from './components/LeadsList';
import { Header, SearchBar } from '../../components';
import { getHashString } from '../../utility/hashing';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuthStore, useMyLeadStore } from '../../store';
import { MainStackProps } from '../../router/interface';
import { Colors } from '../../constants';

const MyLeads = () => {
    const { user_detail: userData, deviceId: uuid, token } = useAuthStore();
    const { getLeads, isFinish, leadsData, page, loading, setMyLeadPage } = useMyLeadStore();
    const navigation = useNavigation<NavigationProp<MainStackProps, 'BottomTab'>>();
    const [search, setSearch] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);

    const fetchLeads = async ({ page = 0 }: { page?: number }) => {
        console.log("Initial fetch with page:", page);
        try {
            const fnName = 'getLeads';
            const hash_key = getHashString(
                userData.mkey!,
                userData.msalt!,
                uuid,
                fnName,
            );
            const formData = new FormData();
            formData.append('uuid', uuid);
            formData.append('hash_key', hash_key);
            formData.append('page_number', page);
            formData.append('limit', 2);
            formData.append('search_key', search);
            getLeads({ token, formData, leadPage: page })
        } catch (error: any) {
            console.log("error isnide fetchLead : ", error);
        }
        setRefresh(false);
    };

    const onEndReached = async () => {
        if (!isFinish) {
            setMyLeadPage({ leadPage: page + 1 });
            fetchLeads({ page: page + 1 });
        }
    };

    const onFilter = () => {
        setSearch('');
        // navigation.navigate('FilterMyLeads');
    };

    const onRefresh = () => {
        setRefresh(true);
        setMyLeadPage({ leadPage: 0 });
        fetchLeads({});
    };

    React.useEffect(() => {
        setMyLeadPage({ leadPage: 0 });
        fetchLeads({ page: 0 });

        const timeoutId = setTimeout(() => {
            setMyLeadPage({ leadPage: 1 });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title={'My Leads'} />
            <SearchBar
                onPress={onFilter}
                onChangeText={setSearch}
                value={search}
                enabled={true}
            />
            <LeadsList
                search={search}
                data={leadsData}
                onEndReached={onEndReached}
                finish={isFinish}
                loading={loading}
                onRefresh={onRefresh}
                refresh={refresh}
                page={page}
            />
        </View>
    )
}

export default MyLeads;