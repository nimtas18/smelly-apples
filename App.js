import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/TImer';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage'

const STATUS = {
  COMPLETE: 1,
  CANCELLED: 2,
};

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  console.log('yezza')
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {key:String(focusHistory.length +1), subject, status }]);
    setFocusSubject(null);
  };

  const onClear = () =>{
    setFocusHistory([])
  }

  const saveFocusHistory = async () =>{
    try{
      await AsyncStorage.setItem("focusHistory",JSON.stringify(focusHistory))
    }catch(e){
      console.log(e);
    }
  }

  const loadFocusHistory = async () => {
    try{
      const history = await AsyncStorage.getItem("focusHistory");

      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    loadFocusHistory();
  },[])

  useEffect(()=>{
    saveFocusHistory();
  },[focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.CANCELLED);
          }}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.COMPLETE);
          }}
          focusSubject={focusSubject}
        />
      ) : (
        <View style={{flex:1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
