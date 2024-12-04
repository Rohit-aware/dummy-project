import React from 'react';
import { helpers } from '../../../utility';
import { fontStyles } from '../../../styles';
import { useMyLeadStore, useStartupStore } from '../../../store';
import { MainStackProps } from '../../../route/interface';
import { Call, Dots, Notes, Share } from '../../../../assets/icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default () => {
  const { openCall } = helpers;
  const { leadDetails } = useMyLeadStore();
  const navigation = useNavigation<NavigationProp<MainStackProps, 'LeadDetails'>>();

  const { data: { screens, share_allowed: share_allowedStartup } } = useStartupStore() || {};
  const { call_icon, share_lead, add_note_icon } = screens?.lead_detail || {}

  const { contact_person, phone, country_id, share_allowed, client_id, company_name } = leadDetails;
  const diplay_number = `${contact_person}  |  +${country_id} ${phone}`;
  const phoneNo = `+${leadDetails.country_id}${leadDetails.phone}`;

  const handleCall = () => openCall({ phone: phoneNo })

  const onShareButton = () => navigation.navigate('ShareLead', { client_id });
  const onNoteButton = () => navigation.navigate('Notes');

  const ButtonTile = ({ onPress, icon, show }: { onPress: () => void, icon: React.ReactNode, show: boolean }) => {
    return show && (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.icons}>
          {icon}
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.companyname}>{company_name}</Text>
      <Text style={styles.phoneno}>{diplay_number}</Text>
      <View style={styles.container}>
        <ButtonTile icon={<Call width={25} height={25} />} onPress={handleCall} show={call_icon} />
        <ButtonTile icon={<Share width={25} height={25} />} onPress={onShareButton} show={(share_allowed == 'Y' && share_lead && share_allowedStartup)} />
        <ButtonTile icon={<Notes width={25} height={25} />} onPress={onNoteButton} show={add_note_icon} />
      </View>
      <Dots />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 35,
    paddingBottom: 15,
    alignItems: 'center',
  },
  companyname: {
    ...fontStyles.r10,
  },
  phoneno: {
    ...fontStyles.r3,
    marginTop: 13,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingHorizontal: 15
  },
  notesicon: {
    marginRight: 5,
  },
});

