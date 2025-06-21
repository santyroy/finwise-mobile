import { FC, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Colors } from '@constants/Colors';
import { OtpPurpose } from '@constants/OtpPurpose';
import { AuthStackParamList } from '@navigation/AuthStack';
import {
  ResetPasswordRequest,
  ResetPasswordSchemaType,
} from 'types/forgotPassword_types';
import { ResetPasswordSchema } from '@schema/forgotPasswordSchema';
import { resetPassword } from '@services/auth';
import CustomError from '@data/CustomError';

import Header from '@components/Header';
import BackButton from '@components/BackButton';
import OtpComponent from '@components/OtpComponent';
import InputComponent from '@components/InputComponent';
import PrimaryButton from '@components/PrimaryButton';
import ErrorComponent from '@components/ErrorComponent';
import LoadingModalComponent from '@components/LoadingModalComponent';
import ErrorModalComponent from '@components/ErrorModalComponent';

interface ResetPasswordScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;
  route: RouteProp<AuthStackParamList, 'ResetPassword'>;
}

const ResetPasswordScreen: FC<ResetPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const [otp, setOtp] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: route.params.email },
  });

  const isOTPValid = () => {
    const otpString = otp.join('');
    if (otp.length !== 6) {
      return false;
    }
    return /^\d{6}$/.test(otpString);
  };

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async data => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    const isValid = isOTPValid();
    if (!isValid) {
      return;
    }

    const apiRequest: ResetPasswordRequest = {
      otp: otp.join(''),
      email: data.email,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
      otpPurpose: OtpPurpose.PASSWORD_RESET,
    };

    try {
      await resetPassword(apiRequest);
      navigation.replace('SignIn');
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
      {isLoading && <LoadingModalComponent message="Processing..." />}
      {isError && (
        <ErrorModalComponent
          message={error}
          onPress={() => setIsError(false)}
        />
      )}
      <View>
        <BackButton onPress={() => navigation.goBack()} />
        <Header title="Reset Password" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.verificationText}>
          Enter your verification code
        </Text>

        <View style={styles.passwordContainer}>
          <View>
            <OtpComponent otp={otp} setOtp={setOtp} />
          </View>
          <View>
            <InputComponent
              placeHolderText="New Password"
              name="newPassword"
              control={control}
              secureTextEntry={true}
            />
            {errors.newPassword && (
              <ErrorComponent error={errors.newPassword} />
            )}
          </View>
          <View>
            <InputComponent
              placeHolderText="Confirm Password"
              name="confirmPassword"
              control={control}
              secureTextEntry={true}
            />
            {errors.confirmPassword && (
              <ErrorComponent error={errors.confirmPassword} />
            )}
          </View>

          {otp.length === 6 ? (
            <PrimaryButton
              title="Reset Password"
              onPress={handleSubmit(onSubmit)}
            />
          ) : (
            <PrimaryButton
              title="Reset Password"
              disabled
              btnContainerStyle={{ backgroundColor: Colors.violet[40] }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.light[100],
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  verificationText: {
    fontSize: 18,
    marginBottom: 10,
  },
  formContainer: {
    marginTop: 30,
  },
  passwordContainer: {
    gap: 30,
  },
});
