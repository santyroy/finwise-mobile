import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from 'types/navigation_types';
import HomeScreen from 'screens/app/HomeScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
