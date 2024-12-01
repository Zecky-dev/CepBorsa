import React from 'react';

// Icons
import MaterialIcon from '@react-native-vector-icons/material-icons';
import MaterialCommunityIcon from '@react-native-vector-icons/material-design-icons';
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome';
import EvilIcon from '@react-native-vector-icons/evil-icons'

export type IconType = 'material' | 'material-community' | 'fontawesome' | 'evil'

type Props = {
  type?: IconType;
  name: string;
  color?: string;
  size?: number;
};

const Icon = ({ type = 'material-community', name, color, size }: Props) => {
  let IconComponent: React.ComponentType<any>;

  switch (type) {
    case 'fontawesome':
      IconComponent = FontAwesomeIcon;
      break;
    case 'material':
      IconComponent = MaterialIcon;
      break;
    case 'material-community':
      IconComponent = MaterialCommunityIcon;
      break;
    case 'evil':
      IconComponent = EvilIcon;
      break;
    default:
      IconComponent = MaterialCommunityIcon;
  }

  return <IconComponent name={name} color={color} size={size} />;
};

export default Icon;
