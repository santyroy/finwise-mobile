import {FC, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'navigation/AuthStack';
import {RouteProp} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';
import Header from 'components/Header';
import OtpComponent from 'components/OtpComponent';
import PrimaryButton from 'components/PrimaryButton';
import {Colors} from 'constants/colors';
import CountDownComponent from 'components/CountDownComponent';

interface VerificationScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Verification'>;
  route: RouteProp<AuthStackParamList, 'Verification'>;
}

const VerificationScreen: FC<VerificationScreenProps> = ({route}) => {
  const [otp, setOtp] = useState<string[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Verification" />

      <Text style={[styles.title]}>Enter your Verification Code</Text>

      <OtpComponent otp={otp} setOtp={setOtp} />

      <CountDownComponent timeInSeconds={300} />

      <Text style={styles.emailVerificationText}>
        We send verification code to your email{' '}
        <Text style={[styles.textHighlight]}>{route.params.email}</Text>. You
        can check your inbox.
      </Text>

      <Text style={[styles.textHighlight, styles.emailResendText]}>
        I didn’t received the code? Send again
      </Text>

      <PrimaryButton title="Verify" />
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
