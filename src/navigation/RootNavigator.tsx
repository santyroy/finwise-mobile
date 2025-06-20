import { useEffect } from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack, { AppStackParamList } from './AppStack';
import AuthStack, { AuthStackParamList } from './AuthStack';
import { useUserStore } from '@store/UserStore';
import { selectHasHydrated, selectUserIsLoggedIn } from '@store/UserSelectors';
import { hydrateUserStore } from '@utils/storeUtils';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const hasHydrated = useUserStore(selectHasHydrated);
  const isLoggedIn = useUserStore(selectUserIsLoggedIn);

  // hydrate user in store during app launch
  useEffect(() => {
    hydrateUserStore();
  }, []);

  if (!hasHydrated) {
    // show splash screen component here
    // or
    // when using react-native-splash-screen hide the splash screen
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
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
