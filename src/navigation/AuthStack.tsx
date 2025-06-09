import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAppFirstLaunch from '@hooks/useAppFirstLaunch';
import OnboardingScreen from '@screens/auth/OnboardingScreen';
import SignInScreen from '@screens/auth/SignInScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';
import VerificationScreen from '@screens/auth/VerificationScreen';

export type AuthStackParamList = {
  Onboarding: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Verification: {email: string};
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const {isAppFirstLaunched} = useAppFirstLaunch();
  if (isAppFirstLaunched === null) {
    return;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAppFirstLaunched && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
