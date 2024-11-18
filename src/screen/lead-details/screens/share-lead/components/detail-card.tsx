import React from 'react';
import Information from './information';
import { StyleSheet, View, Pressable } from 'react-native';

interface DetailCardProps {
  name: string;
  phone: string;
  designation: string;
  onCheck: () => void;
};

export default ({ name, phone, designation, onCheck }: DetailCardProps) => {
  const [check, setCheck] = React.useState(false);

  const checkToggle = () => {
    setCheck(!check);
    onCheck();
  };

  return (
    <Pressable onPress={checkToggle}>
      <View style={styles.container}>
        <Information title={'Employee Name'} value={name} />
        <Information
          title={'Contact Number'}
          value={phone}
          showCheckbox
          checkToggle={checkToggle}
          check={check}
        />
        <Information title={'Designation'} value={designation} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingVertical: 15,
  },
});
