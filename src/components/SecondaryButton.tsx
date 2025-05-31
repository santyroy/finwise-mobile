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

const SecondaryButton = ({
  title,
  style,
  textStyle,
  ...props
}: PrimaryButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        android_ripple={{color: Colors.violet[40]}}
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

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: Colors.violet['20'],
  },
  button: {
    paddingVertical: 15,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.violet[100],
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
