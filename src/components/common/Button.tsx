import React from 'react';
import { fontStyles } from '../../styles';
import { Colors, moderateScale } from '../../constants';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  title: string;
  textStyle?: TextStyle;
  loading?: boolean;
  hide?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onPress, style, title, textStyle, loading, hide }): JSX.Element => {
  return hide ? <></> : (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading ? true : false}>
      {loading ? (
        <ActivityIndicator size={moderateScale(25)} color={Colors.white} />
      ) : (
        <Text style={[styles.title, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(50),
    width: moderateScale(170),
    backgroundColor: Colors.blue,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(20),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  title: {
    color: Colors.white,
    ...fontStyles.r3,
  },
});

export default Button;
