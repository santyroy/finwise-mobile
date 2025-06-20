import {StyleSheet, Text, View} from 'react-native';
import {selectUserName} from '@store/UserSelectors';
import {useUserStore} from '@store/UserStore';
import SecondaryButton from '@components/SecondaryButton';

const HomeScreen = () => {
  const name = useUserStore(selectUserName);
  const {reset} = useUserStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {name}!</Text>
      <SecondaryButton title="Logout" onPress={reset} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});
