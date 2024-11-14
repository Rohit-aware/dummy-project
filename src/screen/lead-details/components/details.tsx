import React from 'react';
import { fontStyles } from '../../../styles';
import { useToggleText } from '../../../components';
import { Colors as color } from '../../../constants';
import { View, StyleSheet, Text, TextStyle } from 'react-native';

interface InfoTextType {
  title: string;
  value: string;
  onPress?: () => void;
  textStyle?: TextStyle | null;
  selectable?: boolean;
  showMore?: boolean;
}

const InfoText = ({ title, value = '', onPress, textStyle = {}, selectable, showMore = false }: InfoTextType) => {
  const { ToggleText, textToShow } = useToggleText({ input: value, maxLength: 100 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.colon}>:</Text>
      <View style={[styles.value]}>
        <Text
          style={[styles.value, textStyle]}
          onPress={onPress}
          selectable={selectable}
        >
          {textToShow}
        </Text>
        {showMore && ToggleText}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  title: {
    flex: 0.45,
    letterSpacing: 0.4,
    ...fontStyles.r3,
  },
  colon: {
    marginHorizontal: 15,
    ...fontStyles.r3,
  },
  value: {
    flex: 0.7,
    color: color.black,
    ...fontStyles.r3,
    textTransform: 'capitalize',
    textAlign: 'justify'
  },
  toggleText: {
    textDecorationLine: 'underline',
    color: color.blue,
  },
});

export default React.memo(InfoText);
