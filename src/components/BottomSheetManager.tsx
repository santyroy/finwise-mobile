import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Colors } from '@constants/Colors';
import { useBottomSheetStore } from '@store/BottomSheetStore';
import LogoutConfirmationComponent from '@components/LogoutConfirmationComponent';
import { renderBackdrop } from '@components/BottomSheetBackdropComponent';

const BottomSheetManager = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const { isOpen, sheetType, closeSheet } = useBottomSheetStore();
  console.log(isOpen, sheetType, closeSheet);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen]);

  const renderContent = () => {
    switch (sheetType) {
      case 'logoutConfirm':
        return <LogoutConfirmationComponent />;
      default:
        return null;
    }
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      //   snapPoints={['40%']}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: Colors.base.light[100] }}
      onClose={closeSheet}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        {renderContent()}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetManager;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
