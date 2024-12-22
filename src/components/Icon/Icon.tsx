import React from 'react';

// Icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'

export type IconType = 'material' | 'material-community' | 'fontawesome' | 'evil' | 'antdesign' | 'ion'

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
    case 'antdesign':
      IconComponent = AntDesign;
      break;
    case 'ion':
      IconComponent = IonIcon;
      break;
    default:
      IconComponent = MaterialCommunityIcon;
  }

  return <IconComponent name={name} color={color} size={size} />;
};

export default Icon;
