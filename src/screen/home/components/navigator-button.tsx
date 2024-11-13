import React from 'react';
import { Colors } from '../../../constants';
import { fontStyles } from '../../../styles';
import { Play } from '../../../../assets/icons';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
interface NavigationButtonProps {
  title: string;
  value: string;
  onPress: () => void;
}


const NavigationButton: React.FC<NavigationButtonProps> = ({ title, value, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
        <Play />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 23,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    // borderWidth:1,
    marginHorizontal: 15,
  },
  title: {
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 10,
    ...fontStyles.r3,
    color: Colors.lightblue,
  },
  value: {
    ...fontStyles.r6,
    color: Colors.lightblue,
    marginRight: 20,
    minWidth: 50,
    textAlign: 'center',
  }
});
export default NavigationButton;