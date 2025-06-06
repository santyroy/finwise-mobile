import {Colors} from 'constants/colors';
import {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface OtpComponentProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
}

const OtpComponent2 = ({otp, setOtp}: OtpComponentProps) => {
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);
  const ref5 = useRef<TextInput>(null);
  const ref6 = useRef<TextInput>(null);

  const setOtpAtPosition = (index: number, value: string) => {
    if (value === '') {
      // remove character at specific index
      const newOtp = [...otp];
      newOtp.splice(index, 1);
      setOtp(newOtp);
    } else {
      // add character at specific index
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        maxLength={1}
        inputMode="numeric"
        style={styles.input}
        cursorColor={Colors.violet[100]}
        ref={ref1}
        onChangeText={text => {
          if (text !== '') {
            setOtpAtPosition(otp.length, text);
            ref2.current?.focus();
          } else {
            if (otp.length > 0) {
              setOtpAtPosition(otp.length - 1, text);
            }
          }
        }}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        style={styles.input}
        cursorColor={Colors.violet[100]}
        ref={ref2}
        onChangeText={text => {
          if (text !== '') {
            setOtpAtPosition(otp.length, text);
            ref3.current?.focus();
          } else {
            if (otp.length > 1) {
              setOtpAtPosition(otp.length - 1, text);
            }
            ref1.current?.focus();
          }
        }}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        style={styles.input}
        cursorColor={Colors.violet[100]}
        ref={ref3}
        onChangeText={text => {
          if (text !== '') {
            setOtpAtPosition(otp.length, text);
            ref4.current?.focus();
          } else {
            if (otp.length > 2) {
              setOtpAtPosition(otp.length - 1, text);
            }
            ref2.current?.focus();
          }
        }}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        style={styles.input}
        cursorColor={Colors.violet[100]}
        ref={ref4}
        onChangeText={text => {
          if (text !== '') {
            setOtpAtPosition(otp.length, text);
            ref5.current?.focus();
          } else {
            if (otp.length > 3) {
              setOtpAtPosition(otp.length - 1, text);
            }
            ref3.current?.focus();
          }
        }}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        style={styles.input}
        cursorColor={Colors.violet[100]}
        ref={ref5}
        onChangeText={text => {
          if (text !== '') {
            setOtpAtPosition(otp.length, text);
            ref6.current?.focus();
          } else {
            if (otp.length > 4) {
              setOtpAtPosition(otp.length - 1, text);
            }
            ref4.current?.focus();
          }
        }}
      />
      <TextInput
        maxLength={1}
        inputMode="numeric"
        style={styles.input}
        cursorColor={Colors.violet[100]}
        ref={ref6}
        onChangeText={text => {
          if (text !== '') {
            setOtpAtPosition(otp.length, text);
            // ref6.current?.focus();
          } else {
            if (otp.length > 5) {
              setOtpAtPosition(otp.length - 1, text);
            }
            ref5.current?.focus();
          }
        }}
      />
    </View>
  );
};

export default OtpComponent2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 30,
  },
  input: {
    width: 40,
    height: 40,
    backgroundColor: Colors.base.light['60'],
    color: Colors.violet[100],
    borderRadius: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
