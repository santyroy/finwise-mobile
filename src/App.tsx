import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      {/* TODO: Currently as the app supports on light mode, so setting barStyle='dark-content'
      in order to show status bar in both light & dark theme */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
