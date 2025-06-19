import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStack, {AppStackParamList} from './AppStack';
import AuthStack, {AuthStackParamList} from './AuthStack';
import {useUserStore} from 'store/UserStore';
import {selectUserIsLoggedIn} from 'store/UserSelectors';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isLoggedIn = useUserStore(selectUserIsLoggedIn);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <RootStack.Screen name="App" component={AppStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
