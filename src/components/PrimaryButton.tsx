import {
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '@constants/Colors';

interface PrimaryButtonProps extends PressableProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PrimaryButton = ({
  title,
  style,
  textStyle,
  ...props
}: PrimaryButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        android_ripple={{color: Colors.violet[60]}}
        style={({pressed}) => [
          styles.button,
          Platform.OS === 'ios' && pressed ? styles.buttonPressed : null,
          style,
        ]}
        {...props}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.violet[100],
    borderRadius: 15,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 15,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.base.light[80],
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
