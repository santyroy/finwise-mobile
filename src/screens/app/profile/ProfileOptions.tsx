import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@constants/Colors';

type IconName =
  | 'wallet'
  | 'gear'
  | 'arrow-up-from-bracket'
  | 'arrow-right-from-bracket';

enum OptionName {
  Account = 'Account',
  Settings = 'Settings',
  ExportData = 'Export Data',
  Logout = 'Logout',
}

interface Options {
  name: OptionName;
  icon: IconName;
  color?: string;
  bgColor?: string;
}

const options: Options[] = [
  {
    name: OptionName.Account,
    icon: 'wallet',
    color: Colors.violet[100],
    bgColor: Colors.violet[20],
  },
  {
    name: OptionName.Settings,
    icon: 'gear',
    color: Colors.violet[100],
    bgColor: Colors.violet[20],
  },
  {
    name: OptionName.ExportData,
    icon: 'arrow-up-from-bracket',
    color: Colors.violet[100],
    bgColor: Colors.violet[20],
  },
  {
    name: OptionName.Logout,
    icon: 'arrow-right-from-bracket',
    color: Colors.red[100],
    bgColor: Colors.red[20],
  },
];

const ProfileOptions = () => {
  const handleOnPress = (btnName: OptionName) => {
    console.log(`${btnName} button pressed`);
    switch (btnName) {
      case OptionName.Logout:
        break;
      default:
        console.warn(`No action defined for ${btnName}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        {options.map(option => (
          <Pressable
            style={styles.btn}
            key={option.name}
            onPress={() => handleOnPress(option.name)}
          >
            <View style={[styles.btnIcon, { backgroundColor: option.bgColor }]}>
              <Icon
                name={option.icon}
                iconStyle="solid"
                color={option.color}
                size={18}
              />
            </View>
            <Text style={styles.btnText}>{option.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ProfileOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    backgroundColor: Colors.base.light[60],
    borderRadius: 20,
    marginTop: 30,
    gap: 1,
    overflow: 'hidden',
  },
  btn: {
    backgroundColor: Colors.base.light[100],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
  },
  btnIcon: {
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.base.dark[25],
  },
});
