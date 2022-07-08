import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './TIming';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 1;

export const Timer = ({ focusSubject, ...props }) => {
  useKeepAwake();

  const [isStarted, setStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setStarted(false);
    props.onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          onEnd={onEnd}
          minutes={minutes}
          onProgress={onProgress}
          osPaused={!isStarted}
        />
      </View>
      <View>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: 10 }}>
        <ProgressBar
          progress={progress}
          style={{ height: 10 }}
          color="#5E84E2"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setStarted(!isStarted)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setStarted(!isStarted)} />
        )}
      </View>
      <View style={styles.clearsubject}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => {
            props.clearSubject()
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#000000',
    textAlign: 'center',
  },
  task: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearsubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
