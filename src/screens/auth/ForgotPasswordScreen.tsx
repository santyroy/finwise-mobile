import {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'navigation/AuthStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {Colors} from '@constants/Colors';
import {OtpPurpose} from '@constants/OtpPurpose';
import {ForgotPasswordSchema} from '@schema/forgotPasswordSchema';
import {resendOTP} from '@services/auth';
import {ForgotPasswordRequest} from 'types/forgotPassword_types';
import {ResendOTPRequest} from 'types/verifyotp_types';
import CustomError from '@data/CustomError';

import Header from '@components/Header';
import BackButton from '@components/BackButton';
import InputComponent from '@components/InputComponent';
import PrimaryButton from '@components/PrimaryButton';
import ErrorComponent from '@components/ErrorComponent';
import LoadingModalComponent from '@components/LoadingModalComponent';
import ErrorModalComponent from '@components/ErrorModalComponent';

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
}

const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordRequest> = async data => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    const {email} = data;
    const apiReq: ResendOTPRequest = {
      email: email,
      otpPurpose: OtpPurpose.PASSWORD_RESET,
    };
    try {
      await resendOTP(apiReq);
      navigation.navigate('ResetPassword', {email: email});
    } catch (err) {
      setIsError(true);
      if (err instanceof CustomError) {
        setError(err.message);
      } else {
        setError('Something went wrong!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoadingModalComponent message="Sending Email..." />}
      {isError && (
        <ErrorModalComponent
          message={error}
          onPress={() => setIsError(false)}
        />
      )}
      <View>
        <BackButton onPress={() => navigation.goBack()} />
        <Header title="Forgot Password" />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Don't worry.</Text>
        <Text style={styles.headerText}>
          Enter your email and we'll send you the steps to reset your password.
        </Text>
      </View>
      <View style={styles.form}>
        <View>
          <InputComponent
            placeHolderText="Email"
            control={control}
            name="email"
            keyboardType="email-address"
          />
          {errors.email && <ErrorComponent error={errors.email} />}
        </View>
        <PrimaryButton title="Continue" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.light[100],
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  headerContainer: {
    marginTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.base.dark[50],
  },
  form: {
    marginTop: 40,
    gap: 20,
  },
});
