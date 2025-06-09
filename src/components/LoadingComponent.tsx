import {FC} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {Colors} from '@constants/Colors';

interface LoadingComponentProps {
  message?: string;
}

const LoadingComponent: FC<LoadingComponentProps> = ({
  message = 'Loading...',
}) => {
  return (
    <Modal transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{message}</Text>
          <ActivityIndicator color={Colors.violet[100]} size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    minHeight: '20%',
    width: '50%',
    backgroundColor: Colors.base.light[100],
    borderRadius: 10,
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: Colors.base.dark[25],
    marginBottom: 10,
  },
});
