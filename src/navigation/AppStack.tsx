import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/app/home/HomeScreen';
import TransactionScreen from '@screens/app/transaction/TransactionScreen';
import ProfileScreen from '@screens/app/profile/ProfileScreen';
import WalletScreen from '@screens/app/wallet/WalletScreen';
import {
  BottomTabHomeIcon,
  BottomTabTransactionIcon,
  BottomTabWalletIcon,
  BottomTabProfileIcon,
} from '@navigation/Icons';
import { Colors } from 'constants/Colors';

export type AppStackParamList = {
  Home: undefined;
  Transaction: undefined;
  Wallet: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.violet[100],
        tabBarInactiveTintColor: Colors.base.light[20],
        tabBarStyle: { height: 80 },
        tabBarLabelStyle: { marginTop: 5 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: BottomTabHomeIcon,
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ tabBarIcon: BottomTabTransactionIcon }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ tabBarIcon: BottomTabWalletIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: BottomTabProfileIcon }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
