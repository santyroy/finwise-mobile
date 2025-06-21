import { StyleSheet, Text, View } from 'react-native';
import SecondaryButton from '@components/SecondaryButton';
import PrimaryButton from '@components/PrimaryButton';
import { Colors } from '@constants/Colors';
import { useBottomSheetStore } from '@store/BottomSheetStore';
import { useUserStore } from '@store/UserStore';

const LogoutConfirmationComponent = () => {
  const closeSheet = useBottomSheetStore(state => state.closeSheet);
  const reset = useUserStore(state => state.reset);
  const handleLogout = () => {
    reset();
    closeSheet();
  };

  return (
    <>
      <Text style={styles.title}>Logout?</Text>
      <Text style={styles.subTitle}>Are you sure, do you want to logout?</Text>
      <View style={styles.btnContainer}>
        <SecondaryButton
          title="No"
          btnContainerStyle={styles.btn}
          onPress={closeSheet}
        />
        <PrimaryButton
          title="Yes"
          btnContainerStyle={styles.btn}
          onPress={handleLogout}
        />
      </View>
    </>
  );
};

export default LogoutConfirmationComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 40,
    color: Colors.base.light[20],
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
  },
});
