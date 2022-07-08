import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [tempItem, setTempItem] = useState();

  return (
    <View style={styles.container}>
    {console.log('tempItem')}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What woul you like to focus on</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={tempItem}
            onChange={({ nativeEvent: { text } }) => setTempItem(text)}
            style={{ flex: 1, marginRight: 20 }}
          />
          
          <RoundedButton
            onPress={() => addSubject(tempItem)}
            title="+"
            size={50}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:10
  },
  titleContainer: {
    flex: 0.5,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'center',
  },
  title: {
    colour: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  inputContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
