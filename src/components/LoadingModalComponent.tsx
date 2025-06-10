import {FC} from 'react';
import {
  ActivityIndicator,
  Modal,
  ModalProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from '@constants/Colors';

interface LoadingModalComponentProps extends ModalProps {
  message?: string;
}

const LoadingModalComponent: FC<LoadingModalComponentProps> = ({
  message = 'Loading...',
  ...props
}) => {
  return (
    <Modal
      backdropColor={'rgba(0,0,0,0.3)'}
      animationType="slide"
      statusBarTranslucent
      {...props}>
      <View style={styles.container}>
        <View style={[styles.modalContainer]}>
          <Text style={styles.modalText}>{message}</Text>
          <ActivityIndicator color={Colors.violet[100]} size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModalComponent;

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
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 18,
    color: Colors.violet[100],
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});
