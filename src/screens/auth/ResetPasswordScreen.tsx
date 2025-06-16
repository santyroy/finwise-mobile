import {FC, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {Colors} from '@constants/Colors';
import {AuthStackParamList} from '@navigation/AuthStack';
import {
  ResetPasswordRequest,
  ResetPasswordSchemaType,
} from 'types/forgotPassword_types';
import {ResetPasswordSchema} from '@schema/forgotPasswordSchema';

import Header from '@components/Header';
import BackButton from '@components/BackButton';
import OtpComponent from '@components/OtpComponent';
import InputComponent from '@components/InputComponent';
import PrimaryButton from '@components/PrimaryButton';
import ErrorComponent from '@components/ErrorComponent';

interface ResetPasswordScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;
  route: RouteProp<AuthStackParamList, 'ResetPassword'>;
}

const ResetPasswordScreen: FC<ResetPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const [otp, setOtp] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {email: route.params.email},
  });

  const isOTPValid = () => {
    const otpString = otp.join('');
    if (otp.length !== 6) {
      return false;
    }
    return /^\d{6}$/.test(otpString);
  };

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = data => {
    const isValid = isOTPValid();
    console.log(otp);
    console.log(isValid);
    if (!isValid) {
      return;
    }

    const apiRequest: ResetPasswordRequest = {
      otp: otp.join(''),
      email: data.email,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };
    console.log(apiRequest);
  };

  return (
    <SafeAreaView style={styles.container}>
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
              btnContainerStyle={{backgroundColor: Colors.violet[40]}}
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
    paddingHorizontal: 10,
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
