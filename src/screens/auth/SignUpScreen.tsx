import { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import { Link } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from '@react-native-vector-icons/fontawesome6';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Colors } from '@constants/Colors';
import { SignupRequest } from 'types/signup_types';

import PrimaryButton from '@components/PrimaryButton';
import InputComponent from '@components/InputComponent';
import ErrorComponent from '@components/ErrorComponent';
import Header from '@components/Header';
import LoadingModalComponent from '@components/LoadingModalComponent';
import ErrorModalComponent from '@components/ErrorModalComponent';

import { SignUpSchema } from '@schema/signupSchema';
import { AuthStackParamList } from '@navigation/AuthStack';

import { signup } from '@services/auth';
import CustomError from '@data/CustomError';

interface SignUpScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;
}

const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<SignupRequest> = async data => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    try {
      const response = await signup(data);
      const { email } = response.data;
      navigation.navigate('Verification', { email: email });
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
      {isLoading && (
        <LoadingModalComponent message="Signing Up..." visible={isLoading} />
      )}
      {isError && (
        <ErrorModalComponent
          message={error}
          visible={isError}
          onPress={() => setIsError(false)}
        />
      )}

      <View>
        <Header title="Sign Up" />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formInputContainer}>
          <InputComponent
            name="name"
            placeHolderText="Name"
            control={control}
          />
          <View>{errors.name && <ErrorComponent error={errors.name} />}</View>
        </View>
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
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            >
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

        <View style={styles.formInputContainer}>
          <InputComponent
            name="mobileNumber"
            placeHolderText="Mobile Number"
            control={control}
            keyboardType="number-pad"
          />
          <View>
            {errors.mobileNumber && (
              <ErrorComponent error={errors.mobileNumber} />
            )}
          </View>
        </View>

        <View style={styles.termsAndConditionContainer}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => {
              setToggleCheckBox(newValue);
            }}
            tintColors={{ true: Colors.violet[100], false: Colors.violet[100] }}
          />
          <View>
            <Text style={styles.termAndConditionText}>
              By signing up, you agree to the{' '}
              <Text style={{ color: Colors.violet[100] }}>
                Terms of Service and Privacy Policy
              </Text>
            </Text>
          </View>
        </View>

        <PrimaryButton
          title="Sign Up"
          btnContainerStyle={styles.marginTop30}
          onPress={handleSubmit(onSubmit)}
          disabled={!toggleCheckBox}
          btnStyle={{
            backgroundColor: toggleCheckBox
              ? Colors.violet[100]
              : Colors.violet[40],
          }}
        />

        <View style={styles.linksContainer}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <Link screen={'SignIn'} params={{}} style={styles.signupLink}>
            Sign In
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.light[100],
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  formContainer: { marginTop: 50, gap: 20 },
  formInputContainer: { gap: 5 },
  positionRelative: { position: 'relative' },
  buttonEye: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: Colors.base.light[100],
  },
  termsAndConditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '90%',
    gap: 5,
  },
  termAndConditionText: {
    fontSize: 14,
    lineHeight: 18,
  },
  marginTop30: { marginTop: 30 },
  forgotPasswordLink: {
    color: Colors.violet[100],
    fontSize: 16,
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
