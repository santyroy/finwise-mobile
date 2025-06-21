import { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';

import { Colors } from '@constants/Colors';
import { selectUserImage, selectUserName } from '@store/UserSelectors';
import { useUserStore } from '@store/UserStore';

const ProfileHeader: FC = () => {
  const name = useUserStore(selectUserName);
  const image = useUserStore(selectUserImage);
  const profilePicture = image
    ? { uri: image }
    : require('@assets/images/profile/default_profile.png');

  return (
    <View style={styles.header}>
      <View style={styles.userDetails}>
        <Image
          source={profilePicture}
          style={styles.userImage}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.userTitleKey}>Username</Text>
          <Text style={styles.userTitleValue}>{name}</Text>
        </View>
      </View>

      <Pressable hitSlop={20}>
        <Icon
          name="pen"
          iconStyle="solid"
          size={18}
          color={Colors.violet[100]}
        />
      </Pressable>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userImage: {
    height: 80,
    width: 80,
    borderWidth: 3,
    borderColor: Colors.violet[100],
    borderRadius: 40,
  },
  userTitleKey: {
    fontSize: 12,
    color: Colors.base.light[20],
  },
  userTitleValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.base.dark[75],
  },
});
