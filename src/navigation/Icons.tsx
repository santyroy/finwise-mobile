import Icon from '@react-native-vector-icons/fontawesome6';

interface IconProp {
  color: string;
  size: number;
}

export const BottomTabHomeIcon = ({ color, size }: IconProp) => {
  return <Icon name="house" iconStyle="solid" color={color} size={size} />;
};

export const BottomTabTransactionIcon = ({ color, size }: IconProp) => {
  return <Icon name="right-left" iconStyle="solid" color={color} size={size} />;
};

export const BottomTabWalletIcon = ({ color, size }: IconProp) => {
  return <Icon name="chart-pie" iconStyle="solid" color={color} size={size} />;
};

export const BottomTabProfileIcon = ({ color, size }: IconProp) => {
  return <Icon name="user" iconStyle="solid" color={color} size={size} />;
};
