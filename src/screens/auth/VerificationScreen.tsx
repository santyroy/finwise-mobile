import {FC, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import Header from '@components/Header';
import OtpComponent from '@components/OtpComponent';
import PrimaryButton from '@components/PrimaryButton';
import OTPCountDownComponent from '@components/OTPCountDownComponent';
import LoadingModalComponent from '@components/LoadingModalComponent';
import ErrorModalComponent from '@components/ErrorModalComponent';

import {Colors} from '@constants/Colors';
import {OtpPurpose} from '@constants/OtpPurpose';
import CustomError from 'data/CustomError';
import {verifySignupUser} from '@services/auth';
import {AuthStackParamList} from '@navigation/AuthStack';

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
      await verifySignupUser({
        otp: value,
        email: email,
        otpPurpose: OtpPurpose.ACCOUNT_VERIFICATION,
      });
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
          onPress={() => setIsError(false)}
        />
      )}

      <Header title="Verification" />

      <Text style={[styles.title]}>Enter your Verification Code</Text>

      <OtpComponent otp={otp} setOtp={setOtp} />

      <OTPCountDownComponent email={email} />

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
});
