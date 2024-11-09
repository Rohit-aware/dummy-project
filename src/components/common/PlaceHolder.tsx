import React from 'react';
import { Colors } from '../../constants';
import { fontStyles } from '../../styles';
import { StyleSheet, Text, TextStyle } from 'react-native';

type PlaceHolderProps = {
  star: boolean;
  placeholder: string;
  placeholderStyle?: TextStyle;
};

export default ({ star, placeholder, placeholderStyle }: PlaceHolderProps) => {
  return (
    <Text style={[styles.common, placeholderStyle]} numberOfLines={1} ellipsizeMode="tail">
      <Text style={styles.placeholder}>{placeholder}</Text>
      {star && <Text style={styles.star}> *</Text>}
    </Text>
  );
};

const styles = StyleSheet.create({
  common: {
    position: 'absolute',
    marginLeft: 15,
    opacity: 0.5,
    zIndex: -1,
    ...fontStyles.r3,
  },
  placeholder: {
    letterSpacing: 1,
  },
  star: {
    color: Colors.brown,
  },
});
