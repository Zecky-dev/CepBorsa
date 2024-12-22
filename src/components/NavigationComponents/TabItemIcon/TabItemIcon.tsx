import React from 'react';
import {View} from 'react-native';

import styles from './TabItemIcon.style';

type TabItemProps = {
  children: React.ReactNode;
  focused: boolean;
  activeBackgroundColor?: string;
};

const TabItemIcon = ({children, focused, activeBackgroundColor = 'white'}: TabItemProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: focused ? activeBackgroundColor : 'transparent',
        },
      ]}>
      {children}
    </View>
  );
};

export default TabItemIcon;
