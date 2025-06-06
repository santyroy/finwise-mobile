import {Colors} from 'constants/colors';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CountDownComponentProps {
  timeInSeconds: number;
}

const CountDownComponent = ({timeInSeconds}: CountDownComponentProps) => {
  const [time, setTime] = useState(timeInSeconds);

  useEffect(() => {
    // run every second
    const interval = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <View>
      <Text style={styles.time}>{`${minutes
        .toString()
        .padStart(2, '0')} : ${seconds.toString().padEnd(2, '0')}`}</Text>
    </View>
  );
};

export default CountDownComponent;

const styles = StyleSheet.create({
  time: {
    color: Colors.violet[100],
    fontWeight: 'bold',
    fontSize: 16,
  },
});
