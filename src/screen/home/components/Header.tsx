import Box from './box';
import React from 'react';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { useAuthStore, useHomeStore } from '../../../store';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import moderateScale, { SCREEN_WIDTH } from '../../../constants/dimenssion';
import { View, Text, StyleSheet, ImageBackground, Pressable, Alert } from 'react-native';


const BACKGROUND_IMAGE = require('../../../../assets/images/bluebg.png');
const LOGOUT_ICON = require('../../../../assets/images/logout.png');

const Header = () => {
  const { navigate } = useNavigation<any>();
  const { data, processLogout } = useHomeStore();
  const { token, clearLoginData } = useAuthStore();

  const onLeads = () => navigate('MyLeads');

  const onMyProjects = () => navigate('MyProjects');

  const doLogout = async () => {
    try {
      const res = await processLogout({ token });
      if (res.success === "1") {
        clearLoginData();
      } else {
        console.log("response failed : ",res)
      }
    } catch (error: any) {
      console.log('Error inside doLogout Api in Header.js : ', error.message)
    }
  }
  const onLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      { text: 'cancel' },
      {
        text: 'ok',
        onPress: doLogout,
      },
    ]);
  };

  return (
    <>
      <ImageBackground
        source={BACKGROUND_IMAGE}
        style={styles.backgroundimage}
        resizeMode="cover">
        <View style={styles.wrapper}>
          <Pressable style={styles.btn} onPress={onLogout}>
            <FastImage
              source={LOGOUT_ICON}
              style={styles.logouticon}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.textcontainer}>
            <Text style={styles.welcome}>{'Welcome !! '}</Text>
            <Text style={styles.name}>{'Name'}</Text>
          </Text>
          <Text style={styles.number}>{'Bla Bla Blaa'}</Text>
        </View>
      </ImageBackground>
      <View style={styles.btncontainer}>
        <Box
          title={'Leads'}
          todayvalue={data.leadsToday}
          totalvalue={data.totalLeads}
          containerStyle={styles.button}
          onPress={onLeads}
        />
        <Box
          title={'Projects'}
          todayvalue={data.projectsToday}
          totalvalue={data.totalProjects}
          onPress={onMyProjects}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundimage: {
    width: SCREEN_WIDTH,
    aspectRatio: 1.6,
    height: undefined,
    position: 'absolute',
    top: -37,
  },
  wrapper: {
    flex: 1,
    paddingTop: moderateScale(30),
    borderColor: 'transparent',
  },
  btn: {
    width: moderateScale(40),
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: moderateScale(20),
    marginRight: moderateScale(15),
  },
  logouticon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  textcontainer: {
    color: Colors.white,
    textAlign: 'center',
    marginTop: moderateScale(5),
  },
  welcome: {
    ...fontStyles.r4,
  },
  name: {
    ...fontStyles.r5,
  },
  number: {
    color: Colors.white,
    textAlign: 'center',
    marginTop: moderateScale(10),
    ...fontStyles.r3,
  },
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(2),
  },
  button: {
    marginRight: moderateScale(15),
  },
});
export default Header;