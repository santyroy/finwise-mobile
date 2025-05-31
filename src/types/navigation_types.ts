import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Onboarding: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export type AppStackParamList = {
  Home: undefined;
};

export type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;
