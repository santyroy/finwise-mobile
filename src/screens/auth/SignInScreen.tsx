import {FC, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Link} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Icon from '@react-native-vector-icons/fontawesome6';

import PrimaryButton from '@components/PrimaryButton';
import InputComponent from '@components/InputComponent';
import ErrorComponent from '@components/ErrorComponent';
import Header from '@components/Header';
import LoadingModalComponent from '@components/LoadingModalComponent';
import ErrorModalComponent from '@components/ErrorModalComponent';

import {Colors} from '@constants/Colors';
import {SignInSchema} from '@schema/signinSchema';
import {signin} from '@services/auth';
import CustomError from '@data/CustomError';
import {SignInRequest} from 'types/signin_types';
import {useUserStore} from '@store/UserStore';
import {RootStackParamList} from '@navigation/RootNavigator';

interface SignInScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
}

const SignInScreen: FC<SignInScreenProps> = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInRequest>({resolver: zodResolver(SignInSchema)});

  const {setUser} = useUserStore();

  const onSubmit: SubmitHandler<SignInRequest> = async data => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    try {
      const response = await signin(data);
      const {
        data: {userId, name, email, accessToken, refreshToken, roles},
      } = response;
      setUser({userId, name, email, accessToken, refreshToken, roles});
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
      {isLoading && <LoadingModalComponent message="Signing In..." />}
      {isError && (
        <ErrorModalComponent
          message={error}
          onPress={() => setIsError(false)}
        />
      )}
      <View>
        <Header title="Sign In" />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formInputContainer}>
          <InputComponent
            name="email"
            placeHolderText="Email"
            control={control}
            keyboardType="email-address"
          />
          <View>{errors.email && <ErrorComponent error={errors.email} />}</View>
        </View>

        <View style={styles.formInputContainer}>
          <View style={styles.positionRelative}>
            <InputComponent
              name="password"
              placeHolderText="Password"
              control={control}
              secureTextEntry={isPasswordHidden}
            />
            <Pressable
              style={styles.buttonEye}
              hitSlop={20}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
              {isPasswordHidden ? (
                <Icon name="eye" size={20} color={Colors.base.light[20]} />
              ) : (
                <Icon
                  name="eye-slash"
                  size={20}
                  color={Colors.base.light[20]}
                />
              )}
            </Pressable>
          </View>
          <View>
            {errors.password && <ErrorComponent error={errors.password} />}
          </View>
        </View>

        <PrimaryButton
          title="Sign In"
          btnContainerStyle={styles.marginTop30}
          onPress={handleSubmit(onSubmit)}
        />

        <Link
          screen={'ForgotPassword'}
          params={{}}
          style={styles.forgotPasswordLink}>
          Forgot Password?
        </Link>

        <View style={styles.linksContainer}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <Link screen={'SignUp'} params={{}} style={styles.signupLink}>
            Sign Up
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.light[100],
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  formContainer: {marginTop: 50, gap: 20},
  formInputContainer: {gap: 5},
  positionRelative: {position: 'relative'},
  buttonEye: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: Colors.base.light[100],
  },
  marginTop30: {marginTop: 30},
  forgotPasswordLink: {
    color: Colors.violet[100],
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  signupText: {
    color: Colors.base.light[20],
    fontWeight: '500',
    fontSize: 16,
  },
  signupLink: {
    color: Colors.violet[100],
    fontSize: 16,
    fontWeight: 'bold',
  },
});
