import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from '@navigation/RootNavigator';
import BottomSheetManager from 'components/BottomSheetManager';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={style.container}>
      <SafeAreaProvider>
        {/* TODO: Currently as the app supports on light mode, so setting barStyle='dark-content'
      in order to show status bar in both light & dark theme */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
        />
        <RootNavigator />
        <BottomSheetManager />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
