import React from 'react'
import Title from './components/title';
import { useStartupStore } from '../../store';
import { useProfileHook } from './profile-hook'
import YearsModal from './components/years-modal';
import { Header, Loader } from '../../components';
import WorkOverview from './components/work-overview';
import SwitchButton from './components/switch-buttons';
import { Colors, moderateScale } from '../../constants';
import PersonalDetails from './components/personal-details';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

const MyProfile = () => {
  const { data: { screens: { profile: { profile_details, work_overview } = {} } = {} } = {} } = useStartupStore();

  const {
    year,
    open,
    close,
    active,
    loading,
    refresh,
    isVisible,
    onRefresh,
    setActive,
    changeYear,
    profileLoad,
  } = useProfileHook();

  if (profileLoad) return (<Loader />)
  return (
    <View style={styles.root}>
      <Header title={'My Profile'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        contentContainerStyle={styles.contentContainerStyle}>
        <Title />
        <SwitchButton setActive={setActive} active={active} />
        {(active == 'Personal Details' && profile_details) ? (
          <PersonalDetails />
        ) : work_overview ? (
          <WorkOverview year={year} open={open} loading={loading} />
        ) :
          <></>}
      </ScrollView>
      <YearsModal
        close={close}
        isVisible={isVisible}
        selectedyear={year}
        changeYear={changeYear}
      />
    </View>
  )
}

export default MyProfile
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    paddingBottom: moderateScale(30),
  },
});