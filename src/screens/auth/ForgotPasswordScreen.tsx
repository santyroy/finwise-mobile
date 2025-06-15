import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'navigation/AuthStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import Header from '@components/Header';
import BackButton from '@components/BackButton';
import InputComponent from '@components/InputComponent';
import PrimaryButton from '@components/PrimaryButton';
import ErrorComponent from '@components/ErrorComponent';
import {Colors} from '@constants/Colors';
import {ForgotPasswordSchema} from '@schema/forgotPasswordSchema';

interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
}

type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordRequest> = data =>
    navigation.navigate('ResetPassword', {email: data.email});

  return (
    <SafeAreaView style={styles.container}>
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
