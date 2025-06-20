import {
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '@constants/Colors';

interface ButtonProps extends PressableProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  btnContainerStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
}

const RIPPLE_COLOR = Colors.violet[60];
const PRESSED_OPACITY = 0.5;

const PrimaryButton: FC<ButtonProps> = React.memo(
  ({title, textStyle, btnContainerStyle, btnStyle, ...props}) => {
    return (
      <View
        style={[styles.buttonContainer, styles.shadowProp, btnContainerStyle]}>
        <Pressable
          style={({pressed}) => [
            pressed && Platform.OS === 'ios' && styles.buttonPressed,
            styles.button,
            btnStyle,
          ]}
          android_ripple={{color: RIPPLE_COLOR}}
          {...props}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </Pressable>
      </View>
    );
  },
);

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.violet[100],
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  button: {
    padding: 15,
  },
  buttonPressed: {
    opacity: PRESSED_OPACITY,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.base.light[100],
    fontSize: 18,
    fontWeight: 'bold',
  },
  shadowProp: {
    shadowColor: Colors.base.dark[25],
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
});
