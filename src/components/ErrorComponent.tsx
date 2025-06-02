import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {FieldError} from 'react-hook-form';
import {Colors} from 'constants/colors';
import Icon from '@react-native-vector-icons/fontawesome6';

interface ErrorComponentProps {
  error: FieldError;
}

const ErrorComponent: FC<ErrorComponentProps> = ({error}) => {
  return (
    <View style={styles.errorContainer}>
      <Icon
        name="circle-exclamation"
        color={Colors.red[100]}
        size={14}
        iconStyle="solid"
      />
      <Text style={styles.errorText}>{error.message}</Text>
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  errorText: {
    color: Colors.red[100],
  },
});
