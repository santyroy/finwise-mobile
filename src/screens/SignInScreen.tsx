import {Colors} from '@constants/colors';
import Icon from '@react-native-vector-icons/fontawesome6';
import {Link} from '@react-navigation/native';
import PrimaryButton from 'components/PrimaryButton';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SubmitHandler, useForm} from 'react-hook-form';
import InputComponent from 'components/InputComponent';
import {SignInSchema} from '@schema/signinSchema';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import ErrorComponent from 'components/ErrorComponent';

type SignInSchemaType = z.infer<typeof SignInSchema>;

const SignInScreen = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInSchemaType>({resolver: zodResolver(SignInSchema)});

  const onSubmit: SubmitHandler<SignInSchemaType> = data => console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign In</Text>
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
                <Icon
                  name="eye-slash"
                  size={20}
                  color={Colors.base.light[20]}
                />
              ) : (
                <Icon name="eye" size={20} color={Colors.base.light[20]} />
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {fontSize: 18, fontWeight: 'bold'},
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
