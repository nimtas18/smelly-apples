import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, ...props }) => {
  const interval = React.useRef(null);
  


  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        props.onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(()=>{
    props.onProgress(millis/minutesToMillis(minutes));
  },[millis])

  useEffect(()=>{
    setMillis(minutesToMillis(minutes))
  },[minutes])

  useEffect(() => {
    if (props.osPaused == true) {
      if(interval.current) clearInterval(interval.current);
      return;
    } else{
      interval.current = setInterval(countDown, 1000);
      
    return () => 
        clearInterval(interval.current);
       
  }},[props.osPaused]);

  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 80,
    color: '#000000',
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
