import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '@screens/app/profile/ProfileHeader';
import ProfileOptions from '@screens/app/profile/ProfileOptions';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <ProfileOptions />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
