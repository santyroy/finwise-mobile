import {FC, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import Header from '@components/Header';
import OtpComponent from '@components/OtpComponent';
import PrimaryButton from '@components/PrimaryButton';
import CountDownComponent from '@components/CountDownComponent';
import LoadingModalComponent from '@components/LoadingModalComponent';
import ErrorModalComponent from '@components/ErrorModalComponent';

import {Colors} from '@constants/Colors';
import CustomError from 'data/CustomError';
import {verifySignupUser} from '@services/auth';
import {AuthStackParamList} from '@navigation/AuthStack';

const OTP_EXP_TIME_SEC = 300;

interface VerificationScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Verification'>;
  route: RouteProp<AuthStackParamList, 'Verification'>;
}

const VerificationScreen: FC<VerificationScreenProps> = ({
  route,
  navigation,
}) => {
  const [otp, setOtp] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const email = route.params.email;

  const verifyOTP = async () => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    try {
      const value = otp.join('');
      await verifySignupUser({otp: value, email: email});
      navigation.navigate('SignIn');
    } catch (err) {
      setIsError(true);
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <LoadingModalComponent
          message="Verifying User..."
          visible={isLoading}
        />
      )}
      {isError && (
        <ErrorModalComponent
          message={error}
          visible={isError}
          onClose={setIsError}
        />
      )}

      <Header title="Verification" />

      <Text style={[styles.title]}>Enter your Verification Code</Text>

      <OtpComponent otp={otp} setOtp={setOtp} />

      <CountDownComponent timeInSeconds={OTP_EXP_TIME_SEC} />

      <Text style={styles.emailVerificationText}>
        We send verification code to your email{' '}
        <Text style={[styles.textHighlight]}>{email}</Text>. You can check your
        inbox.
      </Text>

      <Text style={[styles.textHighlight, styles.emailResendText]}>
        I didn't received the code? Send again
      </Text>

      {otp.length === 6 ? (
        <PrimaryButton title="Verify" onPress={() => verifyOTP()} />
      ) : (
        <PrimaryButton
          title="Verify"
          disabled
          btnContainerStyle={{backgroundColor: Colors.violet[40]}}
        />
      )}
    </SafeAreaView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.base.light[100],
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    marginTop: 20,
  },
  marginTop40: {marginTop: 40},
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
