import React from 'react';
import Details from './details';
import { helpers } from '../../../utility';
import { Colors } from '../../../constants';
import { showToast } from '../../../components';
import { Linking, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyLeadStore } from '../../../store';

export default () => {
  const navigation = useNavigation<any>();
  const { checkForEmpty } = helpers;
  const { leadDetails } = useMyLeadStore();
  const {
    email,
    city_name,
    state_name,
    country_name,
    source,
    linkedin_url,
    website_url,
    address,
    created_on,
    share_lead,
    shared_count,
    client_id,
    person_role,
    country_id,
    remark,
    skype,
    outsider_name,
  } = leadDetails;

  // console.log(leadDetail)
  const onShowMembers = () => {
    navigation.navigate('ViewLeads', {
      client_id,
    });
  };

  const onClickofLink = async (value: string) => {
    if (value !== '') {
      try {
        Linking.openURL(value);
      } catch (error) {
        // showToast("Don't know how to open this type of URL!");
        showToast("An error occurred while trying to open the URL.");
      }
    }
  };
  const getSource = () =>
    (source == 'outsider' && !checkForEmpty(outsider_name)) ? `${source} (${outsider_name})` : source;

  return (
    <View style={styles.container}>
      <Details
        title={'Email ID'}
        value={email}
        selectable
        textStyle={styles.offCapitalize}
      />
      {!checkForEmpty(person_role) && (
        <Details title={'Designation'} value={person_role} />
      )}

      <Details
        title={'Location'}
        value={
          (checkForEmpty(state_name) || checkForEmpty(city_name) || country_id != '91')
            ? country_name
            : `${city_name}, ${state_name}`
        }
      />
      <Details title={'Source'} value={getSource()} />
      {!checkForEmpty(linkedin_url) && (
        <Details
          title={'LinkedIn'}
          value={linkedin_url}
          textStyle={linkedin_url !== '' ? styles.link : null}
          onPress={() => onClickofLink(linkedin_url)}
        />
      )}
      {!checkForEmpty(website_url) && (
        <Details
          title={'Website'}
          value={website_url}
          textStyle={website_url !== '' ? styles.link : null}
          onPress={() => onClickofLink(website_url)}
        />
      )}

      {!checkForEmpty(skype) && <Details title={'Skype ID'} value={skype} />}
      {!checkForEmpty(address) && <Details title={'Address'} value={address} />}
      <Details title={'Creation Date'} value={created_on} />
      <Details
        title={'Lead Access'}
        value={`${shared_count} ${shared_count == '1' ? 'member' : 'members'}`}
        textStyle={styles.leadtext}
        onPress={onShowMembers}
      />
      <Details
        title={'Requirement'}
        value={remark}
        textStyle={styles.offCapitalize}
        showMore
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
  },
  leadtext: {
    color: Colors.yellow,
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.blue,
    textTransform: 'none',
  },
  offCapitalize: {
    textTransform: 'none',
  },
});
