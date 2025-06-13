import {FC} from 'react';
import {Modal, ModalProps, StyleSheet, Text, View} from 'react-native';
import {Colors} from '@constants/Colors';
import Icon from '@react-native-vector-icons/fontawesome6';
import PrimaryButton from './PrimaryButton';

interface ErrorModalComponentProps extends ModalProps {
  message?: string;
  onPress: () => void;
}

const ErrorModalComponent: FC<ErrorModalComponentProps> = ({
  message = 'Loading...',
  onPress,
  ...props
}) => {
  return (
    <Modal
      statusBarTranslucent
      animationType="slide"
      backdropColor={'rgba(0,0,0,0.3)'}
      {...props}>
      <View style={styles.container}>
        <View style={[styles.modalContainer]}>
          <Icon
            name="circle-xmark"
            size={40}
            color={Colors.red[100]}
            iconStyle="solid"
          />
          <Text style={styles.modalText}>{message}</Text>
          <PrimaryButton
            title="Try again"
            onPress={onPress}
            btnStyle={[styles.closeBtn]}
            textStyle={styles.closeBtnText}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModalComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalContainer: {
    backgroundColor: Colors.base.light[100],
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    // boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
  },
  modalText: {
    fontSize: 18,
    color: Colors.base.dark[25],
    marginVertical: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeBtn: {
    backgroundColor: Colors.red[100],
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeBtnText: {
    color: Colors.base.light[100],
    fontWeight: 'bold',
  },
});
