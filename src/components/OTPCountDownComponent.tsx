import {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Config} from 'react-native-config';

import ErrorModalComponent from '@components/ErrorModalComponent';

import {Colors} from '@constants/Colors';
import {resendOTP} from '@services/auth';
import CustomError from '@data/CustomError';

const expTimeSeconds = parseInt(Config.OTP_EXP_TIME_SEC, 10);

interface OTPCountDownComponentProps {
  email: string;
}

const OTPCountDownComponent: FC<OTPCountDownComponentProps> = ({email}) => {
  const [time, setTime] = useState(expTimeSeconds);
  const [isResendOTPAllowed, setIsResendOTPAllowed] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // run every second
    if (time > 0) {
      const interval = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResendOTPAllowed(true);
    }
  }, [time]);

  const handleResendOTP = async () => {
    setIsResendOTPAllowed(false);
    setTime(expTimeSeconds);
    // make API call to resend OTP
    setIsError(false);
    setError('');
    try {
      await resendOTP({email: email});
    } catch (err) {
      setIsError(true);
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError('Something went wrong!');
      }
    }
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      {!isResendOTPAllowed && (
        <View>
          <Text style={styles.time}>{`${minutes
            .toString()
            .padStart(2, '0')} : ${
            seconds < 10
              ? seconds.toString().padStart(2, '0')
              : seconds.toString().padEnd(2, '0')
          }`}</Text>
        </View>
      )}

      <Text style={styles.emailVerificationText}>
        We send verification code to your email{' '}
        <Text style={[styles.textHighlight]}>{email}</Text>. You can check your
        inbox.
      </Text>

      {isResendOTPAllowed && (
        <Text
          style={[styles.textHighlight, styles.emailResendText]}
          onPress={handleResendOTP}>
          I didn't received the code? Send again
        </Text>
      )}

      {isError && (
        <ErrorModalComponent
          message={error}
          onPress={() => setIsError(false)}
        />
      )}
    </>
  );
};

export default OTPCountDownComponent;

const styles = StyleSheet.create({
  time: {
    color: Colors.violet[100],
    fontWeight: 'bold',
    fontSize: 16,
  },
  emailVerificationText: {
    marginVertical: 20,
    lineHeight: 20,
    fontWeight: '500',
    color: Colors.base.dark[25],
  },
  emailResendText: {
    textDecorationLine: 'underline',
    marginBottom: 40,
  },
  textHighlight: {
    color: Colors.violet[100],
    fontWeight: '500',
  },
});
