import React from 'react';
import InfoBox from './InfoBox';
import Line from './line';
import ViewInfo from './view-info';
import { helpers } from '../../../utility';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { useProfileStore, useStartupStore } from '../../../store';
import { View, Text, StyleSheet } from 'react-native';
import { Button, showToast } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import useToggleText from '../../../components/toggle-text/use-toggle-text';

export default () => {
  const navigation = useNavigation<any>();
  const { personalDetails } = useProfileStore();
  const {
    first_name,
    last_name,
    phone_code,
    phone,
    email,
    gender,
    address,
    account_number,
    ifsc_code,
    pancard_number,
    aadhar_number,
    aadhar_card_path: aadhar_card,
    pancard_path: pancard,
    pancard: pan_file_name,
    aadhar_card: aadhar_file_name,
  } = personalDetails;

  const { data: { screens: { profile } = {} } = {} } = useStartupStore();
  const { edit_profile, change_password } = profile || {}

  const { ToggleText, textToShow } = useToggleText({ input: address, maxLength: 60 });
  const { checkForEmpty } = helpers;
  const username = checkForEmpty(first_name)
    ? '-'
    : `${first_name}  ${last_name}`;
  const usernumber = checkForEmpty(first_name)
    ? '-'
    : `+${phone_code} ${phone}`;

  const onPanView = () => {
    if (checkForEmpty(pan_file_name)) {
      showToast('Not found');
    } else {
      navigation.navigate('FileViewer', {
        data: { filePath: pancard, filename: pan_file_name },
      });
    }
  };
  const onAadharView = () => {
    if (checkForEmpty(aadhar_file_name)) {
      showToast('Not found');
    } else {
      navigation.navigate('FileViewer', {
        data: { filePath: aadhar_card, filename: aadhar_file_name },
      });
    }
  };

  return (
    <View style={styles.root}>
      {/* Personal Information */}
      <View style={styles.container}>
        <Text style={styles.heading}>{'Personal Information'}</Text>
        <InfoBox title={'Name'} value={username} />
        <InfoBox title={'Contact No'} value={usernumber} />
        <InfoBox title={'Email ID'} value={email} />
        <InfoBox title={'Gender'} value={gender} />
        <InfoBox
          title={'Address'}
          value={textToShow}
          containerStyle={styles.containerStyle}
        />
        {ToggleText}
        <Line />
      </View>

      {/* Bank Details */}
      <View style={styles.wrapper}>
        <Text style={styles.heading}>{'Bank Details'}</Text>
        <InfoBox title={'Account No'} value={account_number} />
        <InfoBox
          title={'IFSC Code'}
          value={ifsc_code}
          containerStyle={styles.containerStyle}
        />
        <Line />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.heading}>{'KYC Details'}</Text>
        <ViewInfo
          title={'PAN Card'}
          value={pancard_number}
          onPress={onPanView}
          file={pan_file_name}
        />
        <ViewInfo
          title={'Aadhar Card'}
          value={aadhar_number}
          onPress={onAadharView}
          containerStyle={styles.containerStyle}
          file={aadhar_file_name}
        />
        <Line />
      </View>

      <View style={styles.btncontainer}>
        {edit_profile &&
          <Button
            title="EDIT"
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.edit}
            textStyle={styles.edittext}
          />
        }
        {change_password &&
          <Button
            title="CHANGE PASSWORD"
            onPress={() => navigation.navigate('ChangePassword')}
            style={styles.passbtn}
            textStyle={styles.passtext}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 15,
  },
  container: {
    paddingVertical: 25,
  },
  heading: {
    marginBottom: 25,
    ...fontStyles.r8,
  },
  wrapper: {
    paddingVertical: 25,
  },
  containerStyle: {
    marginBottom: 0,
  },
  btncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  edit: {
    width: 155,
    height: 45,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passbtn: {
    width: 155,
    height: 45,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 15,
    backgroundColor: Colors.white,
  },
  passtext: {
    color: Colors.blue,
    ...fontStyles.r15,
  },
  edittext: {
    ...fontStyles.r15,
  },
});
