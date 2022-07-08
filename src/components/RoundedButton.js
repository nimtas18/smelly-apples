import React from 'react';
import {TouchableOpacity, Text, StyleSheet } from 'react-native';
export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}  style={[styles(size).radius]}>
      <Text style={styles(size).text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: '#000000',
      justifyContent: 'center',
      borderWidth: 2,
    },
    text: { color: '#000000', fontSize: size / 3 },
  });

