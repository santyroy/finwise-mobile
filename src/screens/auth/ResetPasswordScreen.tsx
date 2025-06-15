import {FC} from 'react';
import {RouteProp} from '@react-navigation/native';
import {AuthStackParamList} from 'navigation/AuthStack';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors} from '@constants/Colors';
import Header from '@components/Header';
import BackButton from '@components/BackButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface ResetPasswordScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;
  route: RouteProp<AuthStackParamList, 'ResetPassword'>;
}

const ResetPasswordScreen: FC<ResetPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton onPress={() => navigation.goBack()} />
        <Header title="Reset Password" />
      </View>
      <Text>{route?.params?.email}</Text>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.light[100],
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
