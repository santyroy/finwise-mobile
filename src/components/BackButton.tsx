import {Pressable, PressableProps, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
import {Colors} from '@constants/Colors';

interface BackButtonProps extends PressableProps {}

const BackButton: FC<BackButtonProps> = ({...props}) => {
  return (
    <Pressable style={styles.headerBackButton} hitSlop={20} {...props}>
      <Icon
        name="arrow-left"
        iconStyle="solid"
        size={24}
        color={Colors.base.dark[50]}
      />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  headerBackButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
