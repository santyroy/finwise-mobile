import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'types/navigation_types';
import OnboardingScreen from '@screens/OnboardingScreen';
import SignInScreen from '@screens/SignInScreen';
import SignUpScreen from '@screens/SignUpScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
