import {Colors} from '@constants/colors';
import Icon from '@react-native-vector-icons/fontawesome6';
import {Link} from '@react-navigation/native';
import PrimaryButton from 'components/PrimaryButton';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignInScreen = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.base.light[20]}
          keyboardType="email-address"
          style={styles.input}
        />
        <View style={styles.positionRelative}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.base.light[20]}
            secureTextEntry={isPasswordShown}
            style={styles.input}
          />
          <Pressable
            style={styles.buttonEye}
            hitSlop={20}
            onPress={() => setIsPasswordShown(!isPasswordShown)}>
            {isPasswordShown ? (
              <Icon name="eye" size={20} color={Colors.base.light[20]} />
            ) : (
              <Icon name="eye-slash" size={20} color={Colors.base.light[20]} />
            )}
          </Pressable>
        </View>
        <PrimaryButton title="Sign In" btnContainerStyle={styles.marginTop30} />

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
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {fontSize: 18, fontWeight: 'bold'},
  input: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: Colors.base.light[40],
    borderRadius: 15,
  },
  formContainer: {marginTop: 50, gap: 20},
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
