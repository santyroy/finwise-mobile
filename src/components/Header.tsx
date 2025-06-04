import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {fontSize: 18, fontWeight: 'bold'},
});
